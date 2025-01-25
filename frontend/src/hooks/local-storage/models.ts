// Types
interface ILocalStore<T> {
  key: string;
  initValue?: T | null;
  isEncripted?: boolean;
}

interface ISetStorageItem {
  value: string;
  key: string;
  isEncripted?: boolean;
}

export type { ILocalStore, ISetStorageItem };
