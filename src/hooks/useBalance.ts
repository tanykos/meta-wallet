import type { BrowserProvider } from 'ethers';
import { formatEther } from 'ethers';
import { useEffect, useState } from 'react';
import type { BalanceInfo } from '../types/wallet';

export function useBalance(
  address: string | null,
  provider: BrowserProvider | null
): BalanceInfo {
  const [state, setState] = useState<BalanceInfo>({
    balance: null,
    isLoading: !!(address && provider),
    error: null,
  });

  useEffect(() => {
    if (!address || !provider) return;

    let cancelled = false;

    const fetchBalance = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const raw = await provider.getBalance(address);

        if (cancelled) return;

        setState({
          balance: formatEther(raw),
          isLoading: false,
          error: null,
        });
      } catch (err: unknown) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : 'Failed to fetch balance';
        setState({ balance: null, isLoading: false, error: message });
      }
    };

    fetchBalance();

    return () => {
      cancelled = true;
    };
  }, [address, provider]);

  // When address or provider changes, we should immediately signal loading
  // until the effect catches up and updates the state.
  const isTransitioning =
    address !== null &&
    provider !== null &&
    (state.isLoading || state.balance === null);

  return {
    ...state,
    isLoading: isTransitioning || state.isLoading,
  };
}
