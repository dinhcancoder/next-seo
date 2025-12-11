'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '~/lib/utils'

export default function Logo({ logoSrc, className }) {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={logoSrc || '/your-logo.webp'}
        alt="Your Logo"
        width={0}
        height={0}
        sizes="100vw"
        className={cn('h-9 w-auto md:h-11', className)}
        priority
      />
    </Link>
  )
}
