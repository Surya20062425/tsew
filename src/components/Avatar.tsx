import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  name: string;
  className?: string;
  sizeClass?: string;
  fallbackBg?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  className = '',
  sizeClass = 'w-10 h-10',
  fallbackBg = 'bg-[#175CB5] text-white'
}) => {
  const [hasError, setHasError] = useState(false);

  // Derive 1-2 initials from name
  const initials = name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

  if (!src || hasError) {
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-xs select-none shadow-xs shrink-0 ${fallbackBg} ${className}`}
        aria-label={alt || name}
      >
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || name}
      onError={() => setHasError(true)}
      className={`${sizeClass} rounded-full object-cover shrink-0 select-none ${className}`}
      loading="lazy"
    />
  );
};
