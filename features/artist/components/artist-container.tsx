"use client"

import { SwiperAlbum } from "@/features/search/components/list/swiper-albuns"
import { SearchTrackItem } from "@/features/search/components/list/track"
import Image from 'next/image'
import { useArtist, useArtistAlbums, useArtistTopTracks } from "../hooks/artist.hooks"

type Props = {
    artistId: string
}

export const ArtistContainer = ({ artistId }: Props) => {

    const { data: artist } = useArtist(artistId)
    const { data: topTracks } = useArtistTopTracks(artistId)
    const { data: artistAlbuns } = useArtistAlbums(artistId)

    if (!artist) {
        return null
    }

    return (
        <div className="min-h-screen">
            <div>
                <div className="relative h-fit">
                    <Image className="w-full h-full max-w-[500px] max-h-[250px] md:h-full object-cover mb-9" src={artist.images[0].url} alt={artist.name} width={1000} height={1000} />
                    <div className="absolute inset-x-0 bottom-0 h-40
                  bg-gradient-to-t
                  from-background 
                  to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-24
                  bg-gradient-to-t
                  from-background 
                  to-transparent" />
                    <div className="w-full max-w-[500px] p-4 absolute -bottom-9 flex items-center justify-between">
                        <h1 className="text-4xl font-bold max-w-1/2 line-clamp-2">{artist.name}</h1>
                    </div>
                </div>

                <div className="px-3 space-y-3">

                    <h2 className="sm:text-xl font-bold">Discografia</h2>

                    <div>
                        {
                            <SwiperAlbum albums={artistAlbuns || []} />
                        }
                    </div>

                    <h2 className="sm:text-xl font-bold">Top músicas</h2>

                    <div>
                        {topTracks?.map((track) => (
                            <SearchTrackItem key={track.id} track={track} />
                        ))}
                    </div>


                </div>
            </div>
        </div>
    )

}