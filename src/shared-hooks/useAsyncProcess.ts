import { useCallback, useState } from 'react';

export default function useAsyncProcess(initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<Error>();

  const start = useCallback(() => {
    setLoading(true);
    setError(undefined);
  }, [setLoading, setError]);

  const end = useCallback(
    (error?: Error) => {
      setLoading(false);
      setError(error);
    },
    [setLoading, setError]
  );

  return { loading, error, start, end };
}
