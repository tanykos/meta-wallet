import { CopyIcon } from '../assets/icons/CopyIcon';
import { XIcon } from '../assets/icons/XIcon';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { truncateAddress } from '../lib/utils';
import { IconButton } from './IconButton';
import { Tooltip } from './Tooltip';

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
  const { isCopied, copy } = useCopyToClipboard();
  if (isConnected && address) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-2"
        >
          <span
            className="group/addr relative font-medium text-blue-800"
            tabIndex={0}
            aria-label={`Wallet address ${address}`}
          >
            {truncateAddress(address)}
            <Tooltip
              className="hidden bg-gray-900 group-hover/addr:block
                group-focus/addr:block"
            >
              {address}
            </Tooltip>
          </span>

          <IconButton
            icon={<CopyIcon />}
            label="Copy address"
            tooltip={isCopied ? 'Copied!' : 'Copy'}
            tooltipClassName={
              isCopied
                ? 'block bg-green-700'
                : `hidden bg-gray-900 group-hover/copy:block
                  group-focus-visible/copy:block`
            }
            className="group/copy hover:text-blue-900"
            onClick={() => copy(address)}
          />

          <IconButton
            icon={<XIcon className="h-4 w-4" />}
            label="Disconnect"
            tooltip="Disconnect"
            tooltipClassName="hidden bg-gray-900 group-hover:block group-focus-visible:block"
            className="group hover:text-red-500"
            onClick={onDisconnect}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
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
      {error && (
        <p className="mt-2 text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
