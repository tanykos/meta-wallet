import { BalanceDisplay } from './components/BalanceDisplay';
import { ConnectButton } from './components/ConnectButton';
import { useBalance } from './hooks/useBalance';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useTokenBalance } from './hooks/useTokenBalance';
import { useWallet } from './hooks/useWallet';
import {
  ALLOWED_CHAIN_IDS,
  isAllowedNetwork,
  NETWORK_NAMES,
  USDT_ADDRESS,
} from './lib/constants';

function App() {
  const {
    address,
    isConnected,
    chainId,
    error,
    isLoading,
    provider,
    connect,
    disconnect,
    switchNetwork,
  } = useWallet();
  const isOnline = useNetworkStatus();

  // Derived state
  const isSupportedNetwork = isAllowedNetwork(chainId);

  const activeProvider = isSupportedNetwork ? provider : null;

  const ethBalance = useBalance(address, activeProvider);
  const usdtBalance = useTokenBalance(USDT_ADDRESS, address, activeProvider);

  return (
    <div className="min-h-screen p-5 text-black">
      <main className="flex flex-col items-center pt-4">
        {!isOnline && (
          <div
            className="mb-4 w-full max-w-md rounded-lg bg-red-100 p-3
              text-center text-red-700"
          >
            No Internet Connection
          </div>
        )}
        <h1 className="mb-4">Meta-Wallet</h1>
        <ConnectButton
          isConnected={isConnected}
          address={address}
          error={error}
          isLoading={isLoading}
          onConnect={connect}
          onDisconnect={disconnect}
        />
        {isConnected && !isSupportedNetwork && (
          <div
            className="mt-4 flex flex-col items-center rounded-lg bg-red-50 p-4
              text-sm text-red-600 shadow-sm"
          >
            {chainId && (
              <p className="mb-2 font-medium">
                Connected to:{' '}
                <span className="font-bold">
                  {NETWORK_NAMES[chainId] ?? `Chain ID ${chainId}`}
                </span>
              </p>
            )}
            <p className="mb-3 text-center">
              Please switch to{' '}
              {ALLOWED_CHAIN_IDS.map((id: number, index: number) => (
                <span key={id}>
                  <span className="font-bold">{NETWORK_NAMES[id] ?? id}</span>
                  {index < ALLOWED_CHAIN_IDS.length - 1 ? ' or ' : ''}
                </span>
              ))}
            </p>
            {ALLOWED_CHAIN_IDS.length > 0 && (
              <button
                type="button"
                onClick={() => switchNetwork(ALLOWED_CHAIN_IDS[0])}
                className="cursor-pointer rounded-md bg-red-600 px-4 py-2
                  font-medium text-white transition-colors hover:bg-red-700"
              >
                Switch to{' '}
                {NETWORK_NAMES[ALLOWED_CHAIN_IDS[0]] ?? 'Correct Network'}
              </button>
            )}
          </div>
        )}
        {isConnected && isSupportedNetwork && (
          <BalanceDisplay ethBalance={ethBalance} usdtBalance={usdtBalance} />
        )}
      </main>
    </div>
  );
}

export default App;
