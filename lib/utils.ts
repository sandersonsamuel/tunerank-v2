import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function translateType(type: string) {
  switch (type) {
    case "album":
      return "Álbum"
    case "track":
      return "Música"
    case "artist":
      return "Artista"
    default:
      return type
  }
}
