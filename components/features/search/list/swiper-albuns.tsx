"use client"

import { saveAlbum } from "@/dexie/albuns";
import { cn } from "@/lib/utils";
import { SpotifyAlbum } from '@/types/spotify/album';
import { Heart } from "lucide-react";
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  albums: SpotifyAlbum[]
  isLikedFn?: (id: string) => boolean
}

export const SwiperAlbum = ({ albums, isLikedFn }: Props) => {

  const router = useRouter()

  const handleClickAlbum = (album: SpotifyAlbum) => {
    saveAlbum(album)
    router.push(`/album/${album.id}`)
  }

  return (
    <Swiper className='w-full !mx-0 sm:w-auto' slidesPerView={2.5} spaceBetween={30}>
      {albums.map((album) => (
        <SwiperSlide onClick={() => handleClickAlbum(album)} key={album.id} className='space-y-2 max-w-[120px]'>
          <img className={'w-[120px] rounded-lg object-cover relative'}
            src={album.images[1].url || album.images[0].url || album.images[2].url}
            alt={album.name}
            title={album.name + " profile photo"} />
          {isLikedFn && isLikedFn(album.id) && <Heart className="absolute top-2 right-2 w-4 h-4 fill-primary text-primary/80" />}
          <p className='text-start text-xs font-semibold text-neutral-200 truncate'>{album.name}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
