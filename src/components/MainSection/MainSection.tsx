import cubesSm from '@/assets/images/cubes-sm.webp';
import cubes from '@/assets/images/cubes.webp';
import fox from '@/assets/images/fox.webp';
import { WalletPanel } from '../WalletPanel';
import styles from './MainSection.module.css';

export function MainSection() {
  return (
    <section
      className={`${styles.hero} min-h-screen overflow-hidden rounded-3xl`}
    >
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center">
        <h1
          className="max-w-full text-[32px] sm:text-[56px] leading-[40px]
            sm:leading-[64px] tracking-normal text-text-main text-center"
        >
          Meta-Wallet
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-700 sm:text-base">
          Connect your MetaMask wallet and view ETH & USDT balances
          <br />
          on Ethereum Mainnet.
        </p>
        <WalletPanel />
      </div>

      <img
        src={cubesSm}
        srcSet={`${cubesSm} 600w, ${cubes} 1207w`}
        sizes="(max-width: 640px) 100vw, 980px"
        alt="Сubes"
        fetchPriority="high"
        className="pointer-events-none absolute bottom-0 left-1/2 z-30
          max-w-none -translate-x-1/2"
        aria-hidden="true"
      />

      <img
        src={fox}
        alt="Fox"
        className={styles['fox-peek']}
        aria-hidden="true"
      />
    </section>
  );
}
