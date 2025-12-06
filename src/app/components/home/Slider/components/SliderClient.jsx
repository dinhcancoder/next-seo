'use client'

import CustomSwiper from '~/app/components/customs/CustomSwiper'
import EmptySlider from './EmptySlider'

export default function SliderClient({ slider }) {
  const images = slider.data ?? []

  return images.length ? (
    <CustomSwiper
      className="h-[280px] md:h-[425px] lg:h-[calc(100vh-75px)]"
      items={images}
      renderItem={(img) => (
        <img
          src={img.url}
          className="h-full w-full object-cover"
          alt={img.name}
        />
      )}
      autoplay={true}
    />
  ) : (
    <EmptySlider />
  )
}
