import { useEffect, useState } from "react";

interface UseDebounceOptions<T> {
  value: T;
  delay?: number;
}

export function useDebounce<T>({
  value,
  delay = 500,
}: UseDebounceOptions<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
