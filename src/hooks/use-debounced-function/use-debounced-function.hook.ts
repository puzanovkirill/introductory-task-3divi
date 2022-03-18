import { useRef } from 'react';

export default function useDebouncedFunction(func, delay) {
  const ref = useRef<NodeJS.Timeout | null>(null);

  return (...args) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => func(...args), delay);
  };
}
