"use client"

import { saveArtist } from '@/dexie/artists';
import { Artist } from '@/features/artist/types/artist.type';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  artists: Artist[]
}

export const SwiperArtist = ({ artists }: Props) => {

  const router = useRouter()


  return (
    <Swiper className='w-full' slidesPerView={2.5} spaceBetween={30}>
      {artists.map((artist) => (
        <SwiperSlide onClick={() => { saveArtist(artist); router.push(`/artist/${artist.id}`) }} key={artist.id} className='space-y-2 sm:space-x-5 max-w-[150px] w-fit!'>
          {
            artist.images.length > 0 && (
              <img className='size-[120px] rounded-full object-cover'
                src={artist.images[1].url || artist.images[0].url || artist.images[2].url}
                alt={artist.name}
                title={artist.name + " profile photo"}
              />
            )
          }
          <p className='text-start text-xs font-semibold text-neutral-200'>{artist.name}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}