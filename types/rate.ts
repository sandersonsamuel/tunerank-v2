import { Timestamp } from "firebase/firestore"

export type Rate = {
  userId: string,
  trackId: string,
  rating: number,
  review?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}