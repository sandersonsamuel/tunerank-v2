import { db } from "@/firebase/config"
import { DataChartRateReview, Rate, RatesReview } from "@/types/rate";
import { collection, documentId, getDocs, query, where } from "firebase/firestore"

export const getTrackRates = async (trackId: string): Promise<RatesReview> => {
  const q = query(
    collection(db, "ratings"),
    where(documentId(), ">=", trackId + "_"),
    where(documentId(), "<=", trackId + "_\uf8ff")
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(doc => doc.data() as Rate)
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

  data.map((rate) => {
    trackRateData.map((trackRate) => {
      if (rate.rating === trackRate.rating) {
        trackRate.count++
      }
    })

    ratesSum += rate.rating
  })

  return {
    data: trackRateData,
    avarege: ratesSum / data.length
  }
}