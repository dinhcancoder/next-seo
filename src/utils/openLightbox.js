export const openLightbox = async (items, index = 0) => {
  const { Fancybox } = await import('@fancyapps/ui')

  Fancybox.show(
    items.map((img) => ({
      src: img.url,
      thumb: img.url,
      caption: img.name,
    })),
    {
      startIndex: index,
      Thumbs: false,
      Toolbar: {
        display: ['close'],
      },
    },
  )
}
