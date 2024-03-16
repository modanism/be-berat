import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Berat } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDateToReadableString(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: '2-digit',
    // second: '2-digit',
    // timeZoneName: 'short',
  }).format(date);
}

export function sortByDateDescending(data: Berat[]): Berat[] {
  return data.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
}

export const calculateAverage = (berats: Berat[], attributeName: keyof Berat): number => {
  if (attributeName === "id" || attributeName === "tanggal") {
    console.error("Attribute name must be a numeric property");
    return 0;
  }
  const total = berats.reduce((acc, curr) => acc + curr[attributeName], 0);
  return total / berats.length;
};