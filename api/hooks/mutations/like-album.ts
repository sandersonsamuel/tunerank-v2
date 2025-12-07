import { db } from "@/firebase/config"
import { LikeAlbum } from "@/types/album"
import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore"

type Props = {
  albumId: string
  userId: string
}

export const likeAlbumMutation = async ({ albumId, userId }: Props) => {
  try {

    const payload: LikeAlbum = {
      userId,
      albumId,
      createdAt: Timestamp.now()
    }

    await setDoc(doc(db, "likes", albumId + "_" + userId), payload)
  } catch (error) {
    console.log(error)
  }
}

export const unLikeAlbumMutation = async ({ albumId, userId }: Props) => {
  try {
    await deleteDoc(doc(db, "likes", albumId + "_" + userId))
  } catch (error) {
    console.log(error)
  }
}