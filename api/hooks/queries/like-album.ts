import { db } from "@/firebase/config"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"

type Props = {
  userId?: string
  albumId: string
}

export const useGetLikeAlbum = ({ userId, albumId }: Props) => {
  return useQuery({
    queryKey: ["like-album", userId, albumId],
    queryFn: () => getLikeAlbum(userId!, albumId),
    enabled: !!userId
  })
}

export const getLikeAlbum = async (userId: string, albumId: string) => {
  const response = await getDoc(doc(db, "likes", albumId + "_" + userId))
  return !!response.data()
}