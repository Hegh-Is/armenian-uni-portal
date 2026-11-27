import express from 'express';
import {
  UNIVERSITIES,
  PROGRAMS,
  MOBILITY_PROGRAMS,
  ACADEMIC_JOBS,
  NEWS_EVENTS,
  CHANGE_ALERTS,
} from '../src/data/portalData.ts';
import { parseSmartSearchQuery, askGroundedAssistant } from './geminiService.ts';

export function createApiRouter() {
  const router = express.Router();

  router.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'armenia-uniportal-api' });
  });

  router.get('/catalog', (_req, res) => {
    res.json({
      universities: UNIVERSITIES,
      programs: PROGRAMS,
      mobilityPrograms: MOBILITY_PROGRAMS,
      academicJobs: ACADEMIC_JOBS,
      newsEvents: NEWS_EVENTS,
      changeAlerts: CHANGE_ALERTS,
    });
  });

  router.post('/ai/smart-search', async (req, res) => {
    try {
      const { query, lang } = req.body as { query?: string; lang?: 'hy' | 'en' | 'ru' };
      if (!query || typeof query !== 'string' || !query.trim()) {
        res.status(400).json({ error: 'Search query is required.' });
        return;
      }
      const parsed = await parseSmartSearchQuery(query.trim(), lang || 'hy');
      res.json(parsed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Smart search failed';
      console.error('[/api/ai/smart-search]', err);
      res.status(500).json({ error: message });
    }
  });

  router.post('/ai/assistant', async (req, res) => {
    try {
      const { question, lang, history } = req.body as {
        question?: string;
        lang?: 'hy' | 'en' | 'ru';
        history?: Array<{ role: 'user' | 'assistant'; text: string }>;
      };
      if (!question || typeof question !== 'string' || !question.trim()) {
        res.status(400).json({ error: 'Question is required.' });
        return;
      }
      const result = await askGroundedAssistant(
        question.trim(),
        lang || 'hy',
        Array.isArray(history) ? history : []
      );
      res.json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'AI assistant request failed';
      console.error('[/api/ai/assistant]', err);
      res.status(500).json({ error: message });
    }
  });

  return router;
}
