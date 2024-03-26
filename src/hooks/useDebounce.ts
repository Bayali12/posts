import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay?: number): T {
  const [debauncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay ?? 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debauncedValue;
}
