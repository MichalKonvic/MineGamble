import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, format, isThisYear, intlFormatDistance,  } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTimeElapsed(date: Date): string {
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - date.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  if (elapsedSeconds < 0) {
    // Handle future dates separately
    console.error("Do not use formatTimeElapsed for future dates.")
    return "";
  } else if (elapsedSeconds < 60) {
    return `${elapsedSeconds} sec ago`;
  } else if (elapsedSeconds < 3600) {
    const minutes = Math.floor(elapsedSeconds / 60);
    return `${minutes} min ago`;
  } else if (elapsedSeconds < 86400) {
    const hours = Math.floor(elapsedSeconds / 3600);
    return `${hours} h ago`;
  } else if (isThisYear(date)) {
    // Format date without year if it's in the current year
    return format(date, 'd MMM');
  } else {
    // Format date with year if it's not in the current year
    return format(date, 'd MMM y');
  }
}