"use client"

import { ReleaseItem } from "@/components/features/rating/release-item"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserLikes } from "@/features/like/hooks/like.hook"
import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"


export const LikesContainer = () => {

    const searchParams = useSearchParams()
    const router = useRouter()
    let tab = searchParams.get("tab")

    if (tab !== "albums" && tab !== "tracks") {
        tab = "albums"
    }

    const { data: likes, isLoading } = useUserLikes()

    const toggleTab = (value: string) => {
        const param = new URLSearchParams(searchParams.toString())
        param.delete("tab")
        param.append("tab", value)
        router.push(`?${param.toString()}`)
    }

    return (
        <div className="flex flex-col gap-4 px-3">
            <Button className="max-w-[100px]" variant={"outline"} onClick={() => router.push("/my/profile")}> <ArrowLeft /> Voltar</Button>

            <h2 className="text-xl font-bold">Minhas Curtidas</h2>

            <Tabs defaultValue={tab} className="w-full" onValueChange={toggleTab}>
                <TabsList>
                    <TabsTrigger value="albums">Álbuns</TabsTrigger>
                    <TabsTrigger value="tracks">Faixas</TabsTrigger>
                </TabsList>
                <TabsContent className="max-w-full" value="albums">
                    <div className="flex flex-col gap-2 max-w-full">
                        {isLoading ? <p>Carregando...</p> : likes?.albums ? likes?.albums?.map((album) => {

                            const lastImage = album.images[album.images.length - 1]

                            return (
                                <ReleaseItem key={album.id} img={lastImage.url || ""} name={album.name || ""} artist={album.artists[0].name || ""} type="album" id={album.id} />
                            )
                        }) : <p>Você ainda não curtiu nenhum álbum</p>}
                    </div>
                </TabsContent>
                <TabsContent className="max-w-full" value="tracks">
                    <div className="flex flex-col gap-2 max-w-full">
                        {isLoading ? <p>Carregando...</p> : likes?.tracks ? likes?.tracks?.map((track) => {

                            const lastImage = track.album?.images[track.album.images.length - 1]

                            return (
                                <ReleaseItem key={track.id} img={lastImage.url || ""} name={track.name || ""} artist={track.artists[0].name || ""} type="track" id={track.id} />
                            )
                        }) : <p>Você ainda não curtiu nenhuma faixa</p>}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
