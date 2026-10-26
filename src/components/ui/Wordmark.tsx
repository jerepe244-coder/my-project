'use client';

import React from 'react';

interface WordmarkProps {
  className?: string;
  showDescriptor?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  className = '',
  showDescriptor = true,
}) => {
  return (
    <div className={`inline-flex flex-col leading-none select-none ${className}`}>
      <span className="font-sans font-bold tracking-[0.22em] text-zy-fg text-base sm:text-lg transition-colors">
        ZYRVAE
      </span>
      {showDescriptor && (
        <span className="font-mono text-[9px] tracking-[0.3em] text-zy-muted uppercase mt-0.5 transition-colors">
          Digital Studio
        </span>
      )}
    </div>
  );
};
