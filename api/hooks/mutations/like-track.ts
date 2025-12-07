import { db } from "@/firebase/config"
import { LikeTrack } from "@/types/track"
import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore"

type Props = {
  trackId: string
  userId: string
}

export const likeTrackMutation = async ({ trackId, userId }: Props) => {
  try {

    const payload: LikeTrack = {
      userId,
      trackId,
      createdAt: Timestamp.now()
    }

    await setDoc(doc(db, "likes", trackId + "_" + userId), payload)
  } catch (error) {
    console.log(error)
  }
}

export const unLikeTrackMutation = async ({ trackId, userId }: Props) => {
  try {
    await deleteDoc(doc(db, "likes", trackId + "_" + userId))
  } catch (error) {
    console.log(error)
  }
}