import { Artist } from "@/features/artist/types/artist.type";
import { indexedDB } from "./index";

export const saveArtist = async (artist: Artist) => {

  await indexedDB.transaction("rw", indexedDB.artists, async () => {
    
    await indexedDB.artists.delete(artist.id)

    await indexedDB.artists.put({
      ...artist,
      order: Date.now()
    })

    const count = await indexedDB.artists.count();

    if (count > 5){
      const toDelete = await indexedDB.artists.orderBy('order').limit(count - 5).toArray();
      await indexedDB.artists.bulkDelete(toDelete.map((artist) => artist.id));
    }

  })
    
}

export const getArtists = async () => {
  return await indexedDB.artists.orderBy('order').reverse().toArray()
}
