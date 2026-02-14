export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  chainId: number | null;
  error: string | null;
}

export interface BalanceInfo {
  balance: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (
    event: string,
    handler: (...args: unknown[]) => void
  ) => void;
}
