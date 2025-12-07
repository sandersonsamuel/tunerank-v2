import { getAAT } from "@/api/spotify/get-AAT"
import { BetterResultAlbum } from "@/components/better-result/album"
import { BetterResultArtist } from "@/components/better-result/artist"
import { BetterResultTrack } from "@/components/better-result/track"
import { Album } from "@/components/search/album"
import { Artist } from "@/components/search/artist"
import { Track } from "@/components/search/track"
import { SwiperAlbum } from "@/components/search/swiper-albuns"
import { SwiperArtist } from "@/components/search/swiper-artists"
import { SpotifyAlbum } from "@/types/spotify/album"
import { SpotifyArtistItem } from "@/types/spotify/artist"
import { SpotifyTrackItem } from "@/types/spotify/track"

export default async function Search(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const searchParams = await props.searchParams
  const query = searchParams.query as string

  const {
    betterResult,
    albums,
    artists,
    tracks
  } = await getAAT({ query })

  return (
    <main className="px-3 sm:px-10 sm:py-5 space-y-3 w-full gap-5">
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        {
          betterResult && (
            <div className="space-y-3 md:min-w-[540px]">
              <h2 className="sm:text-xl font-bold">Melhor resultado</h2>

              {
                betterResult?.type === 'track' && (
                  <BetterResultTrack betterResult={betterResult as SpotifyTrackItem} />
                )
              }
              {
                betterResult?.type === 'artist' && (
                  <BetterResultArtist betterResult={betterResult as SpotifyArtistItem} />
                )
              }
              {
                betterResult?.type === 'album' && (
                  <BetterResultAlbum betterResult={betterResult as SpotifyAlbum} />
                )
              }

            </div>
          )
        }

        {
          tracks?.items?.length && (
            <div className="w-full space-y-3">
              <h2 className="sm:text-xl font-bold">Músicas</h2>

              <div>
                {
                  tracks?.items?.map((track, index) => (
                    <Track key={index} track={track} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>

      {
        artists?.items?.length && (
          <div className="flex flex-col lg:flex-row gap-5">

            <div className="space-y-3">
              <h2 className="sm:text-xl font-bold">Artistas</h2>
              <div className="sm:hidden">
                <SwiperArtist artists={artists?.items || []} />
              </div>
              <div className="hidden sm:flex">
                {
                  artists?.items?.map((artist, index) => (
                    <Artist key={index} artist={artist} />
                  ))
                }
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="sm:text-xl font-bold">Albuns</h2>
              <div className="sm:hidden">
                <SwiperAlbum albums={albums?.items || []} />
              </div>
              <div className="hidden sm:flex">
                {
                  albums?.items?.map((album, index) => (
                    <Album key={index} album={album} />
                  ))
                }
              </div>
            </div>
          </div>
        )
      }
    </main>
  )
}
