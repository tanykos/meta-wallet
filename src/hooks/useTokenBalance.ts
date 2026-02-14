import type { BrowserProvider } from 'ethers';
import { Contract, formatUnits } from 'ethers';
import { useEffect, useState } from 'react';
import { ERC20_BALANCE_ABI } from '../lib/constants';
import type { BalanceInfo } from '../types/wallet';

export function useTokenBalance(
  tokenAddress: string,
  walletAddress: string | null,
  provider: BrowserProvider | null
): BalanceInfo {
  const [state, setState] = useState<BalanceInfo>({
    balance: null,
    isLoading: !!(walletAddress && provider),
    error: null,
  });

  useEffect(() => {
    if (!walletAddress || !provider) return;

    let cancelled = false;

    const fetchBalance = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const contract = new Contract(
          tokenAddress,
          ERC20_BALANCE_ABI,
          provider
        );

        const [raw, decimals] = await Promise.all([
          contract.balanceOf(walletAddress) as Promise<bigint>,
          contract.decimals() as Promise<bigint>,
        ]);

        if (cancelled) return;

        setState({
          balance: formatUnits(raw, decimals),
          isLoading: false,
          error: null,
        });
      } catch (err: unknown) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : 'Failed to fetch token balance';
        setState({ balance: null, isLoading: false, error: message });
      }
    };

    fetchBalance();

    return () => {
      cancelled = true;
    };
  }, [tokenAddress, walletAddress, provider]);

  // Signal loading during transition
  const isTransitioning =
    walletAddress !== null &&
    provider !== null &&
    (state.isLoading || state.balance === null);

  return {
    ...state,
    isLoading: isTransitioning || state.isLoading,
  };
}
