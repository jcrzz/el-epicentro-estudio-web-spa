import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function staggerDelay(row: number, col: number, rowGap = 120, colGap = 0) {
  return row * rowGap + col * colGap
}
