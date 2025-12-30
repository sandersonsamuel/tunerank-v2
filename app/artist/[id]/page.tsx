import { SearchAlbumItem } from "@/components/features/search/list/album"
import { SwiperAlbum } from "@/components/features/search/list/swiper-albuns"
import { SearchTrackItem } from "@/components/features/search/list/track"
import { getArtist, getArtistAlbums, getArtistTopTracks } from "@/http/spotify/artist"
import Image from 'next/image'
import Link from "next/link"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ArtistPage({ params }: Props) {

  const { id } = await params

  const artist = await getArtist(id)
  const topTracks = await getArtistTopTracks(id)
  const artistAlbuns = await getArtistAlbums(id)

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
            <Link href={artist.external_urls.spotify}>
              <img src="/Spotify_icon.svg" alt="logo do spotify" className="w-9 h-9" /></Link>
          </div>
        </div>

        <div className="px-3 space-y-3">
          <h2 className="sm:text-xl font-bold">Top músicas</h2>

          <div>
            {topTracks.tracks.map((track) => (
              <SearchTrackItem key={track.id} track={track} />
            ))}
          </div>

          <h2 className="sm:text-xl font-bold">Discografia</h2>

          <div>
            {
              <SwiperAlbum albums={artistAlbuns.items || []} />
            }
          </div>


        </div>

      </div>
    </div>
  )
}