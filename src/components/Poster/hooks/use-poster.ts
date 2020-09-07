import { useCallback, useState, } from "react";

export const usePoster = () => {
  const [loadError, setError,] = useState<boolean>(false);

  const onError = useCallback(() => setError(true), [setError,]);

  return {
    loadError,
    onError,
  };
};
