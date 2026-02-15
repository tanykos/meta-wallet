import { ALLOWED_CHAIN_IDS, NETWORK_NAMES } from '../lib/constants';

interface NetworkWarningProps {
  chainId: number | null;
  onSwitchNetwork: (chainId: number) => void;
}

export function NetworkWarning({
  chainId,
  onSwitchNetwork,
}: NetworkWarningProps) {
  return (
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
          onClick={() => onSwitchNetwork(ALLOWED_CHAIN_IDS[0])}
          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-medium
            text-white transition-colors hover:bg-red-700"
        >
          Switch to {NETWORK_NAMES[ALLOWED_CHAIN_IDS[0]] ?? 'Correct Network'}
        </button>
      )}
    </div>
  );
}
