"use client"

import { SpotifyArtistItem } from '@/types/spotify/artist';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  artists: SpotifyArtistItem[]
}

export const SwiperArtist = ({ artists }: Props) => {

  const router = useRouter()

  return (
    <Swiper className='w-full' slidesPerView={2.5} spaceBetween={30}>
      {artists.map((artist) => (
        <SwiperSlide onClick={() => router.push(`/artist/${artist.id}`)} key={artist.id} className='space-y-2 sm:space-x-5 max-w-[150px] !w-fit'>
          <img className='size-[120px] rounded-full object-cover'
            src={artist.images[1].url}
            alt={artist.name}
            title={artist.name + " profile photo"}
          />
          <p className='text-start text-xs font-semibold text-neutral-200'>{artist.name}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}