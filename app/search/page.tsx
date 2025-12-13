import { searchSpotify } from "@/http/spotify/search"
import { FeaturedAlbum } from "@/components/features/search/featured/album"
import { FeaturedTrack } from "@/components/features/search/featured/track"
import { SearchAlbumItem } from "@/components/features/search/list/album"
import { SearchArtistItem } from "@/components/features/search/list/artist"
import { SearchTrackItem } from "@/components/features/search/list/track"
import { SwiperAlbum } from "@/components/features/search/list/swiper-albuns"
import { SwiperArtist } from "@/components/features/search/list/swiper-artists"
import { SpotifyAlbum } from "@/types/spotify/album"
import { SpotifyArtistItem } from "@/types/spotify/artist"
import { SpotifyTrackItem } from "@/types/spotify/track"
import { FeaturedArtist } from "@/components/features/search/featured/artist"
import { getSpotifyRecommendations } from "@/http/spotify/recomendations"

export default async function Search(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const searchParams = await props.searchParams
  const query = searchParams.query as string
  await getSpotifyRecommendations()

  const {
    betterResult,
    albums,
    artists,
    tracks
  } = await searchSpotify({ query })

  return (
    <main className="px-3 sm:px-10 sm:py-5 space-y-3 w-full gap-5">
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        {
          betterResult && (
            <div className="space-y-3 md:min-w-[540px]">
              <h2 className="sm:text-xl font-bold">Melhor resultado</h2>

              {
                betterResult?.type === 'track' && (
                  <FeaturedTrack featuredResult={betterResult as SpotifyTrackItem} />
                )
              }
              {
                betterResult?.type === 'artist' && (
                  <FeaturedArtist featuredResult={betterResult as SpotifyArtistItem} />
                )
              }
              {
                betterResult?.type === 'album' && (
                  <FeaturedAlbum featuredResult={betterResult as SpotifyAlbum} />
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
                    <SearchTrackItem key={index} track={track} />
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
                    <SearchArtistItem key={index} artist={artist} />
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
                    <SearchAlbumItem key={index} album={album} />
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
