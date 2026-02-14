export const MAINNET_CHAIN_ID = 1;

export const NETWORK_NAMES: Record<number, string> = {
  [MAINNET_CHAIN_ID]: 'Ethereum Mainnet',
  [11155111]: 'Sepolia Testnet',
  [137]: 'Polygon Mainnet',
  [80002]: 'Polygon Amoy',
  [56]: 'BSC Mainnet',
  [42161]: 'Arbitrum One',
  [10]: 'OP Mainnet',
};

export const ALLOWED_CHAIN_IDS = (
  import.meta.env.VITE_ALLOWED_CHAIN_IDS ?? MAINNET_CHAIN_ID.toString()
)
  .split(',')
  .map((v: string) => Number(v.trim()))
  .filter((v: number) => !isNaN(v) && v > 0);

export const isAllowedNetwork = (chainId: number | null): boolean => {
  return chainId !== null && ALLOWED_CHAIN_IDS.includes(chainId);
};

export const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

export const ERC20_BALANCE_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
] as const;
