import { Track } from "@/features/track/types/track.type";
import { indexedDB } from "./index";

export const saveTrack = async (track: Track) => {

  await indexedDB.transaction("rw", indexedDB.tracks, async () => {
    
    await indexedDB.tracks.delete(track.id)

    await indexedDB.tracks.put({
      ...track,
      order: Date.now()
    })

    const count = await indexedDB.tracks.count();

    if (count > 5){
      const toDelete = await indexedDB.tracks.orderBy('order').limit(count - 5).toArray();
      await indexedDB.tracks.bulkDelete(toDelete.map((track) => track.id));
    }

  })
    
}

export const getTracks = async () => {
  return await indexedDB.tracks.orderBy('order').reverse().toArray()
}
