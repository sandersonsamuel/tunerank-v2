import { db } from "@/firebase/config"
import { User } from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import toast from "react-hot-toast"

export const postRating = async (rate: number, comment: string, trackId: string, user: User) => {

  try {
    const newRating = {
      id: `${trackId}_${user.uid}`,
      userId: user.uid,
      trackId: trackId,
      rating: rate,
      review: comment,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    await setDoc(doc(db, "ratings", newRating.id), newRating)
    toast.success("Avaliação salva com sucesso")
    
  } catch (error: any) {
    console.log(error)
    toast.error(error.message || "Ocorreu um erro ao salvar a avaliação")
  }

}