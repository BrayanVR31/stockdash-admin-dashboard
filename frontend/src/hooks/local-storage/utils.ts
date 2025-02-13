import CryptoJS from "crypto-js";
import { ISetStorageItem } from "./models";

// Types
type IGetStorageItem = Pick<ISetStorageItem, "key" | "isEncripted">;

/**
 * This function encrypt each value passes as string
 * such as object parsed on JSON format
 */
function setEncryptedItem(value: string) {
  const secretWord = "This is the encryption mode";
  return CryptoJS.AES.encrypt(JSON.stringify(value), secretWord).toString();
}

/**
 * This function create a new local storage value
 * using encryption mode or not.
 */
function setStorageItem({ key, value, isEncripted }: ISetStorageItem) {
  console.log("throw an error...");
  if (isEncripted) {
    const encryptedValue = setEncryptedItem(JSON.stringify(value));
    window.localStorage.setItem(key, encryptedValue);
    return;
  }
  window.localStorage.setItem(key, value);
}

/**
 * This function get a value stored on local storage
 * but in a parsed format even if it's encrypted
 */
function getStorageItem<Parsed>({
  key,
  isEncripted,
}: IGetStorageItem): Parsed | null {
  const value = window.localStorage.getItem(key);
  if (!value) return null;
  if (isEncripted) {
    const secretWord = "This is the encryption mode";
    const bytes = CryptoJS.AES.decrypt(value, secretWord);
    return JSON.parse(bytes.toString()) as Parsed;
  }
  return JSON.parse(value) as Parsed;
}

export { setStorageItem, getStorageItem };
