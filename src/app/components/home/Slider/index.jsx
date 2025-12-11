import { contentService } from '~/services/contentService'
import SliderClient from './components/SliderClient'

export default async function Slider() {
  const sliders = await contentService.findAll({ type: 'slider' })
  const slider = structuredClone(sliders[0])

  return <SliderClient slider={slider} />
}
