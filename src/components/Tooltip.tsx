import type { ReactNode } from 'react';

const BASE_CLASSES =
  'absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs text-white shadow-lg';

interface TooltipProps {
  children: ReactNode;
  className?: string;
}

export function Tooltip({ children, className = '' }: TooltipProps) {
  return (
    <span role="tooltip" className={`${BASE_CLASSES} ${className}`}>
      {children}
    </span>
  );
}
