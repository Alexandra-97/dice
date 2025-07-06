import { useRef } from "react";

export const useThrottle = (callback: () => void, limit: number) => {
  const lastRun = useRef(0);

  return () => {
    if (Date.now() - lastRun.current >= limit) {
      callback();
      lastRun.current = Date.now();
    }
  };
};
