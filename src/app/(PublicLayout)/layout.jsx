import Header from '../components/blocks/header/Header'
import Footer from '../components/blocks/Footer'

export default function PublicLayout({ children }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  )
}
