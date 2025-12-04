'use client'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from '~/components/ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { findBreadcrumb } from '../../admin/lib/findBreadcrumb'

export function AppBreadcrumb() {
  const pathname = usePathname()
  const crumbs = findBreadcrumb(pathname)
  // console.log(pathname)
  // console.log(crumbs)

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin/dashboard">Admin Panel</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {crumbs.map((c, i) => {
          if (i === 0) return null

          const isLast = i === crumbs.length - 1

          return (
            <div key={i} className="flex items-center">
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{c}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink>{c}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
