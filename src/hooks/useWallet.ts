import { BrowserProvider } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { getEthereum } from '../lib/utils';
import type { WalletState } from '../types/wallet';

interface UseWalletReturn extends WalletState {
  provider: BrowserProvider | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

export function useWallet(): UseWalletReturn {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isLoading: false,
    chainId: null,
    error: null,
  });

  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const connect = useCallback(async () => {
    const ethereum = getEthereum();

    if (!ethereum) {
      setState((prev) => ({ ...prev, error: 'MetaMask is not installed' }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const newProvider = new BrowserProvider(ethereum);
      setProvider(newProvider);
      const network = await newProvider.getNetwork();
      const accounts = (await ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];

      const address = accounts[0] ?? null;

      setState({
        address,
        isConnected: address !== null,
        isLoading: false,
        chainId: Number(network.chainId),
        error: null,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Connection rejected';
      setState((prev) => ({ ...prev, isLoading: false, error: message }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setProvider(null);
    setState({
      address: null,
      isConnected: false,
      isLoading: false,
      chainId: null,
      error: null,
    });
  }, []);

  const switchNetwork = useCallback(async (targetChainId: number) => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (err: unknown) {
      console.error('Failed to switch network:', err);
    }
  }, []);

  useEffect(() => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: unknown) => {
      const list = accounts as string[];
      if (list.length === 0) {
        setProvider(null);
        setState({
          address: null,
          isConnected: false,
          isLoading: false,
          chainId: null,
          error: null,
        });
      } else {
        setState((prev) => ({
          ...prev,
          address: list[0] ?? null,
          isConnected: true,
        }));
      }
    };

    const handleChainChanged = (chainIdHex: unknown) => {
      const newChainId = Number(chainIdHex as string);
      setState((prev) => ({ ...prev, chainId: newChainId }));

      const eth = getEthereum();
      if (eth) {
        setProvider(new BrowserProvider(eth));
      }
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return { ...state, provider, connect, disconnect, switchNetwork };
}
