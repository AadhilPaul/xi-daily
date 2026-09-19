import { USER_UUID_STORAGE_KEY } from "@/lib/constants";

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const random = (Math.random() * 16) | 0;
    const value = character === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export function getUserUUID(): string {
  let uuid = localStorage.getItem(USER_UUID_STORAGE_KEY);
  if (!uuid) {
    uuid = generateUUID();
    localStorage.setItem(USER_UUID_STORAGE_KEY, uuid);
  }
  return uuid;
}