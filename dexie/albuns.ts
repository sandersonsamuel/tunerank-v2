import { Album } from "@/features/album/types/album.type";
import { indexedDB } from "./index";

export const saveAlbum = async (album: Album) => {

  await indexedDB.transaction("rw", indexedDB.albuns, async () => {
    
    await indexedDB.albuns.delete(album.id)

    await indexedDB.albuns.put({
      ...album,
      order: Date.now()
    })

    const count = await indexedDB.albuns.count();

    if (count > 5){
      const toDelete = await indexedDB.albuns.orderBy('order').limit(count - 5).toArray();
      await indexedDB.albuns.bulkDelete(toDelete.map((album) => album.id));
    }

  })
    
}

export const getAlbuns = async () => {
  return await indexedDB.albuns.orderBy('order').reverse().toArray()
}