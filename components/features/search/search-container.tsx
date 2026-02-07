"use client"

import { FeaturedAlbum } from "@/components/features/search/featured/album"
import { FeaturedArtist } from "@/components/features/search/featured/artist"
import { FeaturedTrack } from "@/components/features/search/featured/track"
import { SearchAlbumItem } from "@/components/features/search/list/album"
import { SearchArtistItem } from "@/components/features/search/list/artist"
import { SwiperAlbum } from "@/components/features/search/list/swiper-albuns"
import { SwiperArtist } from "@/components/features/search/list/swiper-artists"
import { SearchTrackItem } from "@/components/features/search/list/track"
import { indexedDB } from "@/dexie/index"
import { useGetLikedAlbums, useGetLikedTracks } from "@/http/features/likes/hooks"
import { SpotifyAlbum, SpotifyAlbumSearchResponse, SpotifyArtist } from "@/types/spotify/album"
import { SpotifyArtistItem, SpotifyArtistSearchResponse } from "@/types/spotify/artist"
import { SpotifyTrackItem, SpotifyTrackSearchResponse } from "@/types/spotify/track"
import { userState } from "@/valtio"
import { useLiveQuery } from "dexie-react-hooks"
import { useSnapshot } from "valtio"

type Props = {
  betterResult: SpotifyAlbum | SpotifyTrackItem | SpotifyArtist | undefined
  albums: SpotifyAlbumSearchResponse | undefined
  artists: SpotifyArtistSearchResponse | undefined
  tracks: SpotifyTrackSearchResponse | undefined
}

export const SearchContainer = ({ betterResult, albums, artists, tracks }: Props) => {

  const { data: user } = useSnapshot(userState)

  const historyAlbuns = useLiveQuery(() => indexedDB.albuns.orderBy('order').reverse().toArray())
  const historyArtists = useLiveQuery(() => indexedDB.artists.orderBy('order').reverse().toArray())
  const historyTracks = useLiveQuery(() => indexedDB.tracks.orderBy('order').reverse().toArray())

  const hasSearch = betterResult || albums?.items?.length || artists?.items?.length || tracks?.items?.length
  const hasHistory = historyAlbuns?.length || historyArtists?.length || historyTracks?.length

  const { data: userLikedTracks } = useGetLikedTracks({ userId: user?.uid })
  const { data: userLikedAlbums } = useGetLikedAlbums({ userId: user?.uid })

  const isLikedTrack = (trackId: string) => !!userLikedTracks?.some(track => track.releaseId === trackId)
  const isLikedAlbum = (albumId: string) => !!userLikedAlbums?.some(album => album.releaseId === albumId)

  if (!hasSearch) {
    return (
      <main className="px-3 sm:px-10 sm:py-5 space-y-3 w-full gap-5">
        <h2 className="sm:text-xl font-bold">Histórico de pesquisas</h2>

        {
          !hasHistory && (
            <p className="text-neutral-400">Nenhuma pesquisa recente, tente fazer uma pesquisa para ver os resultados</p>
          )
        }

        <div className="space-y-8">
          {
            historyAlbuns && historyAlbuns.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-neutral-400">Álbuns</h3>
                <div className="sm:hidden">
                  <SwiperAlbum albums={historyAlbuns || []} isLikedFn={isLikedAlbum} />
                </div>
                <div className="hidden sm:flex gap-4 flex-wrap">
                  {
                    historyAlbuns?.map((album, index) => (
                      <SearchAlbumItem key={index} album={album} isLiked={isLikedAlbum(album.id)} />
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
                      <SearchTrackItem key={index} track={track} isLiked={isLikedTrack(track.id)} />
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
                    <SearchTrackItem key={index} track={track} isLiked={isLikedTrack(track.id)} />
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
                <SwiperAlbum albums={albums?.items || []} isLikedFn={isLikedAlbum} />
              </div>
              <div className="hidden sm:flex">
                {
                  albums?.items?.map((album, index) => (
                    <SearchAlbumItem key={index} album={album} isLiked={isLikedAlbum(album.id)} />
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