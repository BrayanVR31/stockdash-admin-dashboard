import { useState, useEffect } from "react";
import { ILocalStore } from "./models";
import { setStorageItem, getStorageItem } from "./utils";

/**
 * This hook create an pair of key and value in
 * local storage object with encrypted mode or not
 */
function useLocalStore<T>({
  key,
  initValue = null,
  isEncripted = false,
}: ILocalStore<T>) {
  const [value, setValue] = useState<T | null>(() =>
    getStorageItem({ key, isEncripted }),
  );
  const initLocalStore = !value && initValue;

  // Side  effects
  useEffect(() => {
    /**
     * Initialize the pair of key and values (localStorage)
     * when it's passed on the first hook function calling
     */
    if (!value) return;
    if (initLocalStore) {
      setStorageItem({ key, value: JSON.stringify(initValue), isEncripted });
      return;
    }
    setStorageItem({ key, value: JSON.stringify(value), isEncripted });
  }, [value]);
  return { value, setValue };
}

export { useLocalStore };
