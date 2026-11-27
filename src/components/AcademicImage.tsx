import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface AcademicImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function AcademicImage({ src, alt, className = '' }: AcademicImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`bg-gradient-to-br from-blue-900 via-blue-800 to-sky-700 text-white flex flex-col items-center justify-center p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Building2 className="w-10 h-10 text-blue-200 mb-2" />
        <span className="text-xs font-medium text-blue-100 max-w-xs">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
