import { Home, Inbox, Info, Settings, UsersRound } from 'lucide-react'

export const menuGroups = [
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
        children: [
          { title: 'Logo', url: '/admin/logo' },
          { title: 'Menu', url: '/admin/menu' },
        ],
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
