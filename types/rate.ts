import { Timestamp } from "firebase/firestore"

export type RateTrack = {
  userId: string,
  trackId: string,
  rating: number,
  review?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}

export type RateAlbum = {
  userId: string,
  albumId: string,
  rating: number,
  review?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}

export type DataChartRateReview = {
  rating: number,
  count: number
}

export type RatesReview = {
  data: DataChartRateReview[],
  avarege: number,
  total: number
}