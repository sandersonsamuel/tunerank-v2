"use client"

import { SpotifyAlbum } from '@/types/spotify/album';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  albums: SpotifyAlbum[]
}

export const SwiperAlbum = ({ albums }: Props) => {

  return (
    <Swiper className='w-full !mx-0 sm:w-auto' slidesPerView={2.5} spaceBetween={30}>
      {albums.map((album) => (
        <SwiperSlide key={album.id} className='space-y-2 max-w-[120px]'>
          <img className='w-[120px] rounded-lg object-cover'
            src={album.images[1].url}
            alt={album.name}
            title={album.name + " profile photo"} />
          <p className='text-start text-xs font-semibold text-neutral-200 truncate'>{album.name}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}