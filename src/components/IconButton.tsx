import type { ReactNode } from 'react';

import { Tooltip } from './Tooltip';

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  tooltip: string;
  tooltipClassName?: string;
  className?: string;
  onClick: () => void;
}

const BASE_CLASSES =
  'relative cursor-pointer rounded-full p-1 text-blue-700 transition-colors hover:bg-white';

export function IconButton({
  icon,
  label,
  tooltip,
  tooltipClassName = 'hidden bg-gray-900',
  className = '',
  onClick,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BASE_CLASSES} ${className}`}
      aria-label={label}
    >
      {icon}
      <Tooltip className={tooltipClassName}>{tooltip}</Tooltip>
    </button>
  );
}
