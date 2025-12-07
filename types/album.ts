import { Timestamp } from "firebase/firestore"

export type LikeAlbum = {
  userId: string
  albumId: string
  createdAt: Timestamp
}