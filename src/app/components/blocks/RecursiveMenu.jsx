'use client'

import Link from 'next/link'
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '~/components/ui/dropdown-menu'

export default function RecursiveMenu({ item }) {
  // Nếu KHÔNG có children → item cấp cuối
  if (!item.children || item.children.length === 0) {
    return (
      <DropdownMenuItem asChild>
        <Link href={item.url || '#'}>{item.label}</Link>
      </DropdownMenuItem>
    )
  }

  // Nếu CÓ children → menu nhiều cấp
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>

      <DropdownMenuSubContent className="w-48">
        {item.children.map((child) => (
          <RecursiveMenu key={child._id} item={child} />
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
