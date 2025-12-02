import Information from '~/app/components/home/Information'
import Main from '~/app/components/home/Main'
import Post from '~/app/components/home/Post'
import Rating from '~/app/components/home/Rating'
import Slider from '~/app/components/home/Slider'

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Trang chủ | Your Brand',
  description: 'Mô tả chính xác nội dung website cho SEO.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Trang chủ | Your Brand',
    description: 'Mô tả chính xác nội dung website khi chia sẻ.',
    siteName: 'Tên thương hiệu',
    images: '/og-image.jpg',
    url: 'https://yourdomain.com',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
}

export default function Page() {
  return (
    <>
      <Slider />
      <Information />
      <Main />
      <Post />
      <Rating />
    </>
  )
}
