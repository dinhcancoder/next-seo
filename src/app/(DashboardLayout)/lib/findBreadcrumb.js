import { menuGroups } from '../configs/menu'

export function findBreadcrumb(pathname) {
  const result = ['Admin Panel']

  for (const group of menuGroups) {
    for (const item of group.items) {
      if (item.url !== '#' && pathname.startsWith(item.url)) {
        result.push(item.title)
        return result
      }

      if (item.children) {
        for (const sub of item.children) {
          if (pathname.startsWith(sub.url)) {
            result.push(item.title)
            result.push(sub.title)
            return result
          }
        }
      }
    }
  }

  return result
}
