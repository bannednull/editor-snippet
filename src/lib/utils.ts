import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateToken(length: number) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  while (token.length < length) {
    token += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return token;
}

export function getFirstLetter(str: string) {
  return str.charAt(0).toUpperCase();
}
