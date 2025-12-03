'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'

export default function MenuItem({ item, level }) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* LABEL + ICON */}
      <div
        className={`flex cursor-pointer items-center gap-1 px-3 py-2 hover:text-blue-600 ${level === 0 ? 'text-gray-800' : 'text-gray-700'} `}
      >
        <Link href={item.url ?? '#'}>{item.label}</Link>

        {/* ICON NẾU CÓ CHILDREN */}
        {hasChildren &&
          (level === 0 ? (
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
            />
          ) : (
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 ${
                open ? 'translate-x-1' : ''
              }`}
            />
          ))}
      </div>

      {/* SUBMENU */}
      {hasChildren && (
        <div
          className={`absolute z-50 min-w-[200px] rounded-lg border bg-white shadow-lg transition-all duration-150 ${level === 0 ? 'top-full left-0' : 'top-0 left-full'} ${open ? 'visible opacity-100' : 'invisible opacity-0'} `}
        >
          <ul className="py-2">
            {item.children.map((child) => (
              <li key={child._id}>
                <MenuItem item={child} level={level + 1} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
