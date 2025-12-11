'use client'

import CustomSwiper from '~/app/components/customs/CustomSwiper'
import EmptySlider from './EmptySlider'
import Image from 'next/image'
import { openLightbox } from '~/utils/openLightbox'

export default function SliderClient({ slider }) {
  const images = slider.data ?? []

  return images.length ? (
    <CustomSwiper
      className="h-[280px] md:h-[425px] lg:h-[calc(100vh-75px)]"
      items={images}
      renderItem={(img, index) => (
        <div
          className="relative h-full w-full"
          onClick={() => openLightbox(images, index)}
        >
          <Image
            src={img.url}
            alt={img.name}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      autoplay={typeof window !== 'undefined' && window.innerWidth > 768}
    />
  ) : (
    <EmptySlider />
  )
}
