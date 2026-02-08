"use client"

import { userState } from "@/valtio"
import { useSnapshot } from "valtio"
import { useGetLikedAlbums, useGetLikedAlbumsById, useGetLikedTracksById, useGetLikedTracks } from "@/http/features/likes/hooks"
import { ReleaseItem } from "@/components/features/rating/release-item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"


export const LikesPageContainer = () => {

    const user = useSnapshot(userState).data

    const searchParams = useSearchParams()
    const router = useRouter()
    let tab = searchParams.get("tab")

    if (tab !== "albums" && tab !== "tracks") {
        tab = "albums"
    }

    const { data: likedAlbums } = useGetLikedAlbums({ userId: user?.uid || "" })
    const likedAlbumsId = likedAlbums?.map((album) => album.releaseId)

    const { data: likedTracks } = useGetLikedTracks({ userId: user?.uid || "" })
    const likedTracksId = likedTracks?.map((track) => track.releaseId)

    const { data: albumsData } = useGetLikedAlbumsById(likedAlbumsId || [])
    const { data: tracksData } = useGetLikedTracksById(likedTracksId || [])

    if (!albumsData || !tracksData) {
        return <div>Carregando...</div>
    }

    const toggleTab = (value: string) => {
        const param = new URLSearchParams(searchParams.toString())
        param.delete("tab")
        param.append("tab", value)
        router.push(`?${param.toString()}`)
    }

    if ("albums" in albumsData && "tracks" in tracksData) {
        return (
            <div className="max-w-full flex flex-col gap-3">
                <Button className="max-w-[100px]" variant={"outline"} onClick={() => router.push("/my/profile")}> <ArrowLeft /> Voltar</Button>

                <h2 className="text-xl font-bold">Minhas Curtidas</h2>

                <Tabs defaultValue={tab} className="w-full" onValueChange={toggleTab}>
                    <TabsList>
                        <TabsTrigger value="albums">Álbuns</TabsTrigger>
                        <TabsTrigger value="tracks">Faixas</TabsTrigger>
                    </TabsList>
                    <TabsContent className="max-w-full" value="albums">
                        <div className="flex flex-col gap-2 max-w-full">
                            {albumsData.albums?.map((album) => (
                                <ReleaseItem key={album.id} img={album.images[1].url || ""} name={album.name || ""} artist={album.artists[0].name || ""} type="album" id={album.id} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent className="max-w-full" value="tracks">
                        <div className="flex flex-col gap-2 max-w-full">
                            {tracksData.tracks?.map((track) => (
                                <ReleaseItem key={track.id} img={track.album?.images[1].url || ""} name={track.name || ""} artist={track.artists[0].name || ""} type="track" id={track.id} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        )
    }
}
