import type { EthereumProvider } from '../types/wallet';

export function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function formatBalance(value: string | null): string {
  if (!value) return '0.00';
  const number = parseFloat(value);
  if (number === 0) return '0.00';
  if (number < 0.0001) return '< 0.0001';
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

export function getEthereum(): EthereumProvider | null {
  return (
    (window as unknown as { ethereum?: EthereumProvider }).ethereum ?? null
  );
}
