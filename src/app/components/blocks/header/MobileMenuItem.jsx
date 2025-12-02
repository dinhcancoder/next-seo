'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus } from 'lucide-react'

export default function MobileMenuItem({ item }) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div>
      {/* ITEM ROW */}
      <div
        className="flex cursor-pointer items-center justify-between py-2"
        onClick={() => hasChildren && setOpen(!open)}
      >
        <Link href={item.url ?? '#'} className="font-medium">
          {item.label}
        </Link>

        {hasChildren && (
          <span className="text-xl">
            {open ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        )}
      </div>

      {/* CHILDREN */}
      {hasChildren && open && (
        <div className="mt-1 ml-4 border-l pl-3">
          {item.children.map((child) => (
            <MobileMenuItem key={child._id} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}
