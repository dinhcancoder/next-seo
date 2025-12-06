import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import Providers from '../providers'
import { AppSidebar } from './components/blocks/AppSidebar'
import AppHeader from './components/blocks/AppHeader'
import { AppBreadcrumb } from './components/blocks/AppBreadcrumb'

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin Panel',
}

export default function DashboardLayout({ children }) {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <section className="w-full">
          <div className="container mx-auto">
            <AppHeader />
            <div className="py-6">
              <AppBreadcrumb />
              {children}
            </div>
          </div>
        </section>
      </SidebarProvider>
    </main>
  )
}
