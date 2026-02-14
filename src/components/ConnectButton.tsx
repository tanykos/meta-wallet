import { truncateAddress } from '../lib/utils';
import { XIcon } from './icons/XIcon';

interface ConnectButtonProps {
  isConnected: boolean;
  address: string | null;
  error: string | null;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function ConnectButton({
  isConnected,
  address,
  error,
  isLoading,
  onConnect,
  onDisconnect,
}: ConnectButtonProps) {
  return (
    <div className="flex flex-col items-center">
      {isConnected && address ? (
        <div
          className="flex items-center gap-2 rounded-md bg-blue-100 p-1 pr-1
            pl-4"
        >
          <span className="font-medium text-blue-800">
            {truncateAddress(address)}
          </span>
          <button
            type="button"
            onClick={onDisconnect}
            className="group relative cursor-pointer rounded-full p-1
              text-blue-600 transition-colors hover:bg-white hover:text-red-500"
            aria-label="Disconnect"
          >
            <XIcon className="h-4 w-4" />
            <span
              className="absolute bottom-full left-1/2 mb-2 hidden
                -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs
                text-white shadow-lg group-hover:block"
            >
              Disconnect
            </span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onConnect}
          disabled={isLoading}
          className={`cursor-pointer rounded-md px-4 py-2 font-medium text-white
            transition-colors ${
              isLoading
                ? 'cursor-not-allowed bg-blue-400'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
      {error && (
        <p className="mt-2 text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
