import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { AppSidebar } from './components/blocks/AppSidebar'
import AppHeader from './components/blocks/AppHeader'
import { AppBreadcrumb } from './components/blocks/AppBreadcrumb'
import AuthAdminProvider from './AuthAdminProvider'

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin Panel',
}

export default async function DashboardLayout({ children }) {
  return (
    <AuthAdminProvider>
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
    </AuthAdminProvider>
  )
}
