import { apiFetch } from '~/lib/api-fetch'
import SliderClient from './components/SliderClient'

const fetchSlider = async () => {
  const data = await apiFetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/contents?type=slider`,
  )
  return data[0] ?? {}
}

export default async function Slider() {
  const slider = await fetchSlider()
  return <SliderClient slider={slider} />
}
