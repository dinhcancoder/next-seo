'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '~/components/ui/dropdown-menu'

import RecursiveMenu from './RecursiveMenu'

export default function HeaderClient({ menu }) {
  const [openMenu, setOpenMenu] = useState(null)

  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between">
      <div id="logo">Your Logo</div>
      <nav className="flex gap-8 px-6 py-4">
        {menu.map((item) => (
          <DropdownMenu
            key={item._id}
            open={openMenu === item._id}
            onOpenChange={(open) => setOpenMenu(open ? item._id : null)}
          >
            <div
              onMouseEnter={() => setOpenMenu(item._id)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <DropdownMenuTrigger asChild>
                <button className="font-semibold hover:text-blue-600">
                  {item.label}
                </button>
              </DropdownMenuTrigger>

              {item.children?.length > 0 && (
                <DropdownMenuContent className="w-48">
                  {item.children.map((child) => (
                    <RecursiveMenu key={child._id} item={child} />
                  ))}
                </DropdownMenuContent>
              )}
            </div>
          </DropdownMenu>
        ))}
      </nav>
      <div>Actions</div>
    </header>
  )
}
