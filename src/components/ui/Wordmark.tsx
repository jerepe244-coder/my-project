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
      <span className="font-sans font-bold tracking-[0.22em] text-white text-base sm:text-lg">
        ZYRVAE
      </span>
      {showDescriptor && (
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#8b92a5] uppercase mt-0.5">
          Digital Studio
        </span>
      )}
    </div>
  );
};
