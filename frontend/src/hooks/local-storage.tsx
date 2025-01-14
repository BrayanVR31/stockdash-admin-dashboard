import { useState, useEffect } from "react";

/**
 * This custom hook read the value stored on local storage object
 * and return parsed value or null
 */
function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [storageValue, changeStorageValue] = useState<T>(
    () => initLocalStorage(key) ?? (defaultValue || null),
  );
  // Side-effects
  useEffect(() => {
    const parsedValue = JSON.stringify(storageValue);
    window.localStorage.setItem(key, parsedValue);
  }, [storageValue]);
  return { storageValue, changeStorageValue };
}

function initLocalStorage(storageKey: string) {
  const key = window.localStorage.getItem(storageKey);
  if (!key) return null;
  return JSON.parse(key);
}

export { useLocalStorage };
