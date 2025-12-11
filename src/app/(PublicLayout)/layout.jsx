import Header from '../components/blocks/header/Header'
import Footer from '../components/blocks/Footer'
import { contentService } from '~/services/contentService'

export default async function PublicLayout({ children }) {
  const logo = await contentService.findOne({ type: 'logo' })
  const { logoHeader, logoFooter } = structuredClone(logo.data)

  return (
    <main>
      <Header logoSrc={logoHeader} />
      {children}
      <Footer logoSrc={logoFooter || logoHeader} />
    </main>
  )
}
