'use client'

import {
  ChevronDown,
  Home,
  Inbox,
  Info,
  Settings,
  UsersRound,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar'

// Menu items.
const menuGroups = [
  {
    group: 'Thiết lập chung',
    items: [
      {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: Home,
        children: null,
      },
      {
        title: 'Trang chủ',
        url: '#',
        icon: Inbox,
        children: [
          { title: 'Giới thiệu chung', url: '/admin/info' },
          { title: 'Slider nổi bật', url: '/admin/slider' },
          { title: 'Ý kiến khách hàng', url: '/admin/customer-comment' },
        ],
      },
      {
        title: 'Cài đặt',
        url: '#',
        icon: Settings,
        children: [{ title: 'Menu', url: '/admin/menu' }],
      },
    ],
  },
  {
    group: 'Thông tin',
    items: [
      {
        title: 'Đăng ký',
        url: '/admin/register',
        icon: UsersRound,
      },
      {
        title: 'Thông tin công ty',
        url: '/admin/company-info',
        icon: Info,
        children: null,
      },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <h2 className="ml-2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text py-5 pt-3 text-xl font-semibold text-transparent">
          Admin Panel
        </h2>

        {menuGroups.map((section) => (
          <SidebarGroup key={section.group}>
            <SidebarGroupLabel>{section.group}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isParentActive = item.children?.some((sub) =>
                    pathname.startsWith(sub.url),
                  )

                  const isActive = pathname === item.url

                  return (
                    <SidebarMenuItem key={item.title}>
                      {item.children ? (
                        <Collapsible defaultOpen={isParentActive}>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              className={`group flex items-center justify-between rounded-md px-2 py-2 transition-all ${
                                isParentActive
                                  ? 'text-primary border-primary hover:bg-primary/10 hover:text-primary hover:!text-primary !bg-sidebar-accent border-l-3 font-semibold'
                                  : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                              } `}
                            >
                              <div className="flex items-center gap-2">
                                <item.icon
                                  className={`h-4 w-4 transition-colors ${
                                    isParentActive
                                      ? 'text-primary'
                                      : 'text-gray-500 group-hover:text-gray-700'
                                  }`}
                                />

                                <span className="flex items-center gap-1.5">
                                  {item.title}
                                  {item.children && (
                                    <span className="mt-0.5 text-[12px] tracking-wide text-gray-500">
                                      ({item.children.length})
                                    </span>
                                  )}
                                </span>
                              </div>

                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  isParentActive
                                    ? 'text-primary rotate-180'
                                    : 'text-gray-500'
                                }`}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map((sub, i) => {
                                const isSubActive = pathname.startsWith(sub.url)

                                return (
                                  <SidebarMenuSubItem key={i}>
                                    <a
                                      href={sub.url}
                                      className={`ml-2.5 block rounded-md py-2 text-sm transition-all ${
                                        isSubActive
                                          ? 'text-primary font-medium'
                                          : 'hover:text-primary text-gray-700'
                                      } `}
                                    >
                                      {sub.title}
                                    </a>
                                  </SidebarMenuSubItem>
                                )
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          className={`rounded-md px-2 py-2 transition-all ${
                            isActive
                              ? 'text-primary hover:text-primary !bg-sidebar-accent border-primary border-l-4 font-semibold'
                              : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <a
                            href={item.url}
                            className="flex items-center gap-2"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
