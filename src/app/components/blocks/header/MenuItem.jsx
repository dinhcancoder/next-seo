'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'

export default function MenuItem({ item, level }) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* LABEL + ICON */}
      <div
        className={`cursor-pointer px-3 py-2 font-medium flex items-center gap-1 hover:text-blue-600
          ${level === 0 ? 'text-gray-800' : 'text-gray-700'}
        `}
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
          className={`
            absolute bg-white shadow-lg border rounded-lg min-w-[200px] z-50
            transition-all duration-150
            ${level === 0 ? 'top-full left-0' : 'top-0 left-full'}
            ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
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
