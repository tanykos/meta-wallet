import type { BalanceInfo } from '../types/wallet';
import { BalanceCard } from './BalanceCard';

interface BalanceDisplayProps {
  ethBalance: BalanceInfo;
  usdtBalance: BalanceInfo;
}

export function BalanceDisplay({
  ethBalance,
  usdtBalance,
}: BalanceDisplayProps) {
  return (
    <div className="mt-4 flex w-fit max-w-full flex-col gap-4">
      <BalanceCard label="ETH" balanceInfo={ethBalance} />
      <BalanceCard label="USDT" balanceInfo={usdtBalance} />
    </div>
  );
}
