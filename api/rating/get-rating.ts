import { db } from "@/firebase/config"
import { Rate } from "@/types/rate"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"
import toast from "react-hot-toast"

export const useGetRating = (trackId?: string, userId?: string) => {

  return useQuery({
    queryKey: ["rating", trackId, userId],
    queryFn: () => getRating(trackId && userId ? trackId + "_" + userId : undefined),
  })
}

export const getRating = async (document_id?: string): Promise<Rate | null> => {
  try {
    if (document_id) {
      const docRef = doc(db, "ratings", document_id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data() as Rate
      } else {
        return null
      }
    }else{
      return {
        userId: "",
        trackId: "",
        rating: 0,
        review: ""
      } as Rate
    }
  } catch (error) {
    console.log(error)
    toast.error("Ocorreu um erro ao buscar a avaliação")
    return null
  }
}