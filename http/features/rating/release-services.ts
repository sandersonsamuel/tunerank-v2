import { db } from "@/firebase/config"
import { RateRelease } from "@/types/rate"
import { collection, documentId, getDocs, query, where } from "firebase/firestore"

export const getReleasesByUserId = async (userId: string) => {
  try {
    const q = query(
      collection(db, "ratings"),
      where("userId", "==", userId)
    )
    const querySnapshot = await getDocs(q)
    const rates: RateRelease[] = []
    querySnapshot.forEach((doc) => {
      rates.push(doc.data() as RateRelease)
    })
    return rates
  } catch (error) {
    console.error("Error getting release rates:", error)
    return []
  }
}