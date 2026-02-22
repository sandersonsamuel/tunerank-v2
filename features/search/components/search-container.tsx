"use client"

import { SearchAlbumItem } from "@/components/features/search/list/album"
import { SearchArtistItem } from "@/components/features/search/list/artist"
import { SwiperAlbum } from "@/components/features/search/list/swiper-albuns"
import { SwiperArtist } from "@/components/features/search/list/swiper-artists"
import { SearchTrackItem } from "@/components/features/search/list/track"
import { useSearch } from "../hooks/search.hooks"
import { HistorySearch } from "./history-search"

type Props = {
    query?: string
}

export const SearchContainer = ({ query }: Props) => {

    const { data } = useSearch(query || "")

    if (!query) {
        return <HistorySearch />
    }

    if (data) {
        const { albums, artists, tracks } = data

        return (
            <main className="px-3 sm:px-10 sm:py-5 space-y-3 w-full gap-5">
                <div className="flex flex-col lg:flex-row gap-5 w-full">
                    {
                        tracks?.length && (
                            <div className="w-full space-y-3">
                                <h2 className="sm:text-xl font-bold">Músicas</h2>

                                <div>
                                    {
                                        tracks?.map((track, index) => (
                                            <SearchTrackItem key={index} track={track} />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

                {
                    artists?.length && (
                        <div className="flex flex-col lg:flex-row gap-5">

                            <div className="space-y-3">
                                <h2 className="sm:text-xl font-bold">Artistas</h2>
                                <div className="sm:hidden">
                                    <SwiperArtist artists={artists || []} />
                                </div>
                                <div className="hidden sm:flex">
                                    {
                                        artists?.map((artist, index) => (
                                            <SearchArtistItem key={index} artist={artist} />
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h2 className="sm:text-xl font-bold">Albuns</h2>
                                <div className="sm:hidden">
                                    <SwiperAlbum albums={albums || []} />
                                </div>
                                <div className="hidden sm:flex">
                                    {
                                        albums?.map((album, index) => (
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
}