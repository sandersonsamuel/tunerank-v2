import { db } from "@/firebase/config"
import { Like } from "@/types/track"
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, Timestamp, where } from "firebase/firestore"

// Track Services
type TrackProps = {
  trackId: string
  userId: string
}

export const likeTrack = async ({ trackId, userId }: TrackProps) => {
  try {
    const payload: Like = {
      userId,
      releaseId: trackId,
      type: "track",
      createdAt: Timestamp.now()
    }
    await setDoc(doc(db, "likes", trackId + "_" + userId), payload)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const unlikeTrack = async ({ trackId, userId }: TrackProps) => {
  try {
    await deleteDoc(doc(db, "likes", trackId + "_" + userId))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getLikeTrack = async (userId: string, trackId: string) => {
  const response = await getDoc(doc(db, "likes", trackId + "_" + userId))
  return !!response.data()
}

export const getLikedTracks = async (userId?: string) => {
  if(!userId) return []
  const response = await getDocs(query(collection(db, "likes"), where("userId", "==", userId), where("type", "==", "track")))
  return response.docs.map(doc => {
    const data = doc.data()
    return {
      id: doc.id,
      userId: data.userId,
      releaseId: data.releaseId,
      type: data.type,
      createdAt: data.createdAt
    }
  })
}

// Album Services
type AlbumProps = {
  albumId: string
  userId: string
}

export const likeAlbum = async ({ albumId, userId }: AlbumProps) => {
  try {
    const payload: Like = {
      userId,
      releaseId: albumId,
      type: "album",
      createdAt: Timestamp.now()
    }
    await setDoc(doc(db, "likes", albumId + "_" + userId), payload)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const unlikeAlbum = async ({ albumId, userId }: AlbumProps) => {
  try {
    await deleteDoc(doc(db, "likes", albumId + "_" + userId))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getLikeAlbum = async (userId: string, albumId: string) => {
  const response = await getDoc(doc(db, "likes", albumId + "_" + userId))
  return !!response.data()
}

export const getLikedAlbums = async (userId: string) => {
  const response = await getDocs(query(collection(db, "likes"), where("userId", "==", userId), where("type", "==", "album")))
  return response.docs.map(doc => {
    const data = doc.data()
    return {
      id: doc.id,
      userId: data.userId,
      releaseId: data.releaseId,
      type: data.type,
      createdAt: data.createdAt
    }
  })
}