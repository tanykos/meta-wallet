import { useCallback, useEffect, useRef, useState } from 'react';

const COPIED_DURATION_MS = 1000;

interface UseCopyToClipboardReturn {
  isCopied: boolean;
  copy: (text: string) => Promise<void>;
}

export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsCopied(true);
    timerRef.current = setTimeout(() => setIsCopied(false), COPIED_DURATION_MS);
  }, []);

  return { isCopied, copy };
}
