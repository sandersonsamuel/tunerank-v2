import { useLiveQuery } from "dexie-react-hooks"
import { indexedDB } from "@/dexie/index"
import { SwiperAlbum } from "@/components/features/search/list/swiper-albuns"
import { SearchAlbumItem } from "@/components/features/search/list/album"
import { SwiperArtist } from "@/components/features/search/list/swiper-artists"
import { SearchArtistItem } from "@/components/features/search/list/artist"
import { SearchTrackItem } from "@/components/features/search/list/track"

export const HistorySearch = () => {

    const historyAlbuns = useLiveQuery(() => indexedDB.albuns.orderBy('order').reverse().toArray())
    const historyArtists = useLiveQuery(() => indexedDB.artists.orderBy('order').reverse().toArray())
    const historyTracks = useLiveQuery(() => indexedDB.tracks.orderBy('order').reverse().toArray())

    return (
        <main className="px-3 sm:px-10 sm:py-5 space-y-3 w-full gap-5">
        <h2 className="sm:text-xl font-bold">Histórico de pesquisas</h2>

        <div className="space-y-8">
          {
            historyAlbuns && historyAlbuns.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-neutral-400">Álbuns</h3>
                <div className="sm:hidden">
                  <SwiperAlbum albums={historyAlbuns || []}/>
                </div>
                <div className="hidden sm:flex gap-4 flex-wrap">
                  {
                    historyAlbuns?.map((album, index) => (
                      <SearchAlbumItem key={index} album={album} />
                    ))
                  }
                </div>
              </div>
            )
          }

          {
            historyArtists && historyArtists.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-neutral-400">Artistas</h3>
                <div className="sm:hidden">
                  <SwiperArtist artists={historyArtists || []} />
                </div>
                <div className="hidden sm:flex gap-4 flex-wrap">
                  {
                    historyArtists?.map((artist, index) => (
                      <SearchArtistItem key={index} artist={artist} />
                    ))
                  }
                </div>
              </div>
            )
          }

          {
            historyTracks && historyTracks.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-neutral-400">Músicas</h3>
                <div>
                  {
                    historyTracks?.map((track, index) => (
                      <SearchTrackItem key={index} track={track} />
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </main>
    )
}