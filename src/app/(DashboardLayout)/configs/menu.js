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
          { title: 'Giới thiệu chung', url: '/admin/general-introduction' },
          { title: 'Slider nổi bật', url: '/admin/sliders' },
          { title: 'Ý kiến khách hàng', url: '/admin/customer-reviews' },
        ],
      },
      {
        title: 'Cài đặt',
        url: '#',
        icon: Settings,
        children: [
          { title: 'Logo', url: '/admin/logo' },
          { title: 'Menu', url: '/admin/menu' },
          { title: 'Tài khoản', url: '/admin/account' },
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
