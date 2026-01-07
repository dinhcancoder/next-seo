import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { AppSidebar } from './components/blocks/AppSidebar'
import AppHeader from './components/blocks/AppHeader'
import { AppBreadcrumb } from './components/blocks/AppBreadcrumb'
import AuthAdminProvider from './AuthAdminProvider'
import { cookies } from 'next/headers'
import { verifyToken } from '~/lib/auth'
import { buildAdminUser } from '~/lib/admin-user'

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin Panel',
}

async function getInitialUser() {
  const token = (await cookies()).get('sessionToken')?.value
  if (!token) return null
  try {
    const payload = await verifyToken(token)
    return buildAdminUser(payload)
  } catch {
    return null
  }
}

export default async function DashboardLayout({ children }) {
  const initialUser = await getInitialUser()
  return (
    <AuthAdminProvider initialUser={initialUser}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <section className="w-full">
          <div className="container mx-auto">
            <AppHeader initialUser={initialUser} />
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
