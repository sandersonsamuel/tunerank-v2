import { Timestamp } from "firebase/firestore"

export type LikeTrack = {
  userId: string
  trackId: string
  createdAt: Timestamp
}