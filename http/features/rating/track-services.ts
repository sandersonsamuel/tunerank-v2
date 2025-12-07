import { db } from "@/firebase/config"
import { DataChartRateReview, RatesReview, RateTrack } from "@/types/rate"
import { User } from "firebase/auth"
import { collection, doc, documentId, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import toast from "react-hot-toast"

export const postRatingTrack = async (rate: number, comment: string, trackId: string, user: User) => {
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
    throw error
  }
}

export const getRatingTrack = async (document_id?: string): Promise<RateTrack | null> => {
  try {
    if (document_id) {
      const docRef = doc(db, "ratings", document_id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data() as RateTrack
      } else {
        return null
      }
    } else {
      return {
        userId: "",
        trackId: "",
        rating: 0,
        review: ""
      } as RateTrack
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getTrackRates = async (trackId: string): Promise<RatesReview> => {
  const q = query(
    collection(db, "ratings"),
    where(documentId(), ">=", trackId + "_"),
    where(documentId(), "<=", trackId + "_\uf8ff")
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(doc => doc.data() as RateTrack)
  const trackRateData = [{
    rating: 0.5,
    count: 0
  }, {
    rating: 1,
    count: 0
  }, {
    rating: 1.5,
    count: 0
  }, {
    rating: 2,
    count: 0
  }, {
    rating: 2.5,
    count: 0
  }, {
    rating: 3,
    count: 0
  }, {
    rating: 3.5,
    count: 0
  }, {
    rating: 4,
    count: 0
  }, {
    rating: 4.5,
    count: 0
  }, {
    rating: 5,
    count: 0
  }] as DataChartRateReview[]
  let ratesSum = 0

  data.forEach((rate) => {
    trackRateData.forEach((trackRate) => {
      if (rate.rating === trackRate.rating) {
        trackRate.count++
      }
    })

    ratesSum += rate.rating
  })

  return {
    data: trackRateData,
    avarege: data.length > 0 ? ratesSum / data.length : 0,
    total: data.length
  }
}
