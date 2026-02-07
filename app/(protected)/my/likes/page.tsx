"use client"

import { userState } from "@/valtio"
import { useSnapshot } from "valtio"
import { useGetLikedAlbums, useGetLikedAlbumsById, useGetLikedTracksById, useGetLikedTracks } from "@/http/features/likes/hooks"
import { ReleaseItem } from "@/components/features/rating/release-item"

export default function LikesPage() {
    const user = useSnapshot(userState).data

    const { data: likedAlbums } = useGetLikedAlbums({ userId: user?.uid || "" })
    const likedAlbumsId = likedAlbums?.map((album) => album.releaseId)

    const { data: likedTracks } = useGetLikedTracks({ userId: user?.uid || "" })
    const likedTracksId = likedTracks?.map((track) => track.releaseId)

    const { data: albumsData } = useGetLikedAlbumsById(likedAlbumsId || [])
    const { data: tracksData } = useGetLikedTracksById(likedTracksId || [])

    if (!albumsData || !tracksData) {
        return <div>Carregando...</div>
    }

    if ("albums" in albumsData && "tracks" in tracksData) {
        return (
            <div className="flex flex-col gap-4 px-3">

                <h2 className="text-xl font-bold mt-5">Minhas Curtidas</h2>

                <div className="flex flex-col gap-2">
                    <h2>Álbuns</h2>
                    {albumsData.albums?.map((album) => (
                        <ReleaseItem key={album.id} img={album.images[1].url || ""} name={album.name || ""} artist={album.artists[0].name || ""} type="album" id={album.id} />
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <h2>Faixas</h2>
                    {tracksData.tracks?.map((track) => (
                        <ReleaseItem key={track.id} img={track.album?.images[1].url || ""} name={track.name || ""} artist={track.artists[0].name || ""} type="track" id={track.id} />
                    ))}
                </div>

            </div>
        )
    }


}