'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MenuItem from './MenuItem'
import MobileMenuItem from './MobileMenuItem'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Logo from './Logo'
import HeaderRight from './HeaderRight'

export default function HeaderClient({ menu }) {
  const [openMobile, setOpenMobile] = useState(false)

  useEffect(() => {
    // 768px
    const mediaQuery = window.matchMedia('(min-width: 1025px)')

    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpenMobile(false)
      }
    }

    mediaQuery.addEventListener('change', handleResize)
    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [])

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto flex items-center justify-between container py-2 max-lg:px-3">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6">
          {menu.map((item) => (
            <MenuItem key={item._id} item={item} level={0} />
          ))}
        </nav>

        {/* Right */}
        <HeaderRight />

        {/* Mobile Button */}
        <Menu className="lg:hidden " onClick={() => setOpenMobile(true)} />
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 ${
          openMobile ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setOpenMobile(false)}
      />

      {/* MOBILE SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 p-4 overflow-y-auto
          transition-transform duration-300
          ${openMobile ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <Logo />
          <X onClick={() => setOpenMobile(false)} />
        </div>

        {/* MOBILE MENU ITEMS */}
        <div className="flex flex-col gap-1">
          {menu.map((item) => (
            <MobileMenuItem key={item._id} item={item} />
          ))}
        </div>

        <div className="mt-5 border-t pt-4">Actions</div>
      </div>
    </header>
  )
}
