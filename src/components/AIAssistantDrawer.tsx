import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ExternalLink, AlertTriangle } from 'lucide-react';
import type { Lang } from '../types/schema';
import { I18N } from '../scripts/i18n';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  citedSources?: Array<{ label: string; url: string }>;
  isError?: boolean;
}

interface AIAssistantDrawerProps {
  isOpen: boolean;
  lang: Lang;
  onClose: () => void;
}

export function AIAssistantDrawer({ isOpen, lang, onClose }: AIAssistantDrawerProps) {
  const t = I18N[lang];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: t.assistant.welcome,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ id: 'welcome', role: 'assistant', text: I18N[lang].assistant.welcome }];
      }
      return prev;
    });
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const sendQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextHistory = [...messages.filter((m) => !m.isError), userMsg];
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          lang,
          history: nextHistory.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = (await res.json()) as {
        answer?: string;
        citedSources?: Array<{ label: string; url: string }>;
        error?: string;
      };

      if (!res.ok || data.error) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: data.answer || '',
          citedSources: data.citedSources || [],
        },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Request failed';
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: msg,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/45 backdrop-blur-xs">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-blue-200 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-drawer-title"
      >
        {/* Header */}
        <div className="bg-blue-950 text-white px-5 py-4 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 id="ai-drawer-title" className="text-base font-semibold">
                {t.assistant.title}
              </h2>
              <p className="text-xs text-blue-200/90 mt-0.5">{t.assistant.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.compare.close}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/70">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.isError
                    ? 'bg-red-50 border border-red-200 text-red-900'
                    : msg.role === 'user'
                      ? 'bg-blue-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-800'
                }`}
              >
                {msg.isError && (
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-red-700 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>API Error</span>
                  </div>
                )}
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.citedSources && msg.citedSources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500">
                      {t.assistant.sourcesLabel}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.citedSources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-950 underline underline-offset-2"
                        >
                          <span>{src.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start">
              <div className="bg-white border border-blue-200 rounded-xl px-4 py-3 text-xs font-medium text-blue-800">
                {t.assistant.thinking}
              </div>
            </div>
          )}

          {/* Suggested Prompts */}
          {messages.length <= 1 && !loading && (
            <div className="pt-2 space-y-2">
              {t.assistant.prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendQuestion(prompt)}
                  className="w-full text-left px-3.5 py-2.5 rounded-lg bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50/50 text-xs font-medium text-blue-950 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendQuestion(input);
          }}
          className="p-4 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.assistant.placeholder}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 text-white text-sm font-medium transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t.assistant.send}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
