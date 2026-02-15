import { formatBalance } from '../lib/utils';
import type { BalanceInfo } from '../types/wallet';

interface BalanceCardProps {
  label: string;
  balanceInfo: BalanceInfo;
  className?: string;
}

export function BalanceCard({
  label,
  balanceInfo,
  className = '',
}: BalanceCardProps) {
  const { balance, isLoading, error } = balanceInfo;

  const renderValue = () => {
    if (isLoading || (balance === null && !error)) {
      return <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />;
    }

    if (error) {
      return (
        <p className="text-sm text-red-600" title={error}>
          Error
        </p>
      );
    }

    return (
      <p className="text-right text-lg font-bold break-all text-gray-900">
        {formatBalance(balance)}
      </p>
    );
  };

  return (
    <div
      className={`flex w-full max-w-full min-w-[300px] items-center
        justify-between gap-4 rounded-lg bg-white p-4 shadow ${className}`}
    >
      <p className="shrink-0 font-medium text-gray-500">{label}</p>
      {renderValue()}
    </div>
  );
}
