import { AlbumPageContainer } from "@/components/layout/pages/album-page"
import { getAlbum } from "@/http/spotify/albums"

type Props = {
  params: Promise<{ id: string }>
}

export default async function AlbumPage({ params }: Props) {

  const { id } = await params
  const album = await getAlbum(id)

  if (!album) {
    return <div>Album not found</div>
  }

  return (
    <AlbumPageContainer album={album} />
  )
}