import { db } from "@/firebase/config"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"

type Props = {
  userId?: string
  trackId: string
}

export const useGetLikeTrack = ({ userId, trackId }: Props) => {
  return useQuery({
    queryKey: ["like-track", userId, trackId],
    queryFn: () => getLikeTrack(userId!, trackId),
    enabled: !!userId
  })
}

export const getLikeTrack = async (userId: string, trackId: string) => {
  const response = await getDoc(doc(db, "likes", trackId + "_" + userId))
  return !!response.data()
}