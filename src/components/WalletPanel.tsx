import { useBalance } from '../hooks/useBalance';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { useWallet } from '../hooks/useWallet';
import { isAllowedNetwork, USDT_ADDRESS } from '../lib/constants';
import { BalanceList } from './BalanceList';
import { ConnectButton } from './ConnectButton';
import { NetworkWarning } from './NetworkWarning';
import { OfflineBanner } from './OfflineBanner';

export function WalletPanel() {
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
  const isSupportedNetwork = isAllowedNetwork(chainId);
  const activeProvider = isSupportedNetwork ? provider : null;
  const ethBalance = useBalance(address, activeProvider);
  const usdtBalance = useTokenBalance(USDT_ADDRESS, address, activeProvider);

  return (
    <div className="flex flex-col items-center pt-4">
      {!isOnline && <OfflineBanner />}
      <ConnectButton
        isConnected={isConnected}
        address={address}
        error={error}
        isLoading={isLoading}
        onConnect={connect}
        onDisconnect={disconnect}
      />
      {isConnected && !isSupportedNetwork && (
        <NetworkWarning chainId={chainId} onSwitchNetwork={switchNetwork} />
      )}
      {isConnected && isSupportedNetwork && (
        <BalanceList ethBalance={ethBalance} usdtBalance={usdtBalance} />
      )}
    </div>
  );
}
