import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '~/lib/api-fetch'

async function fetchMenu() {
  return apiFetch('/api/menu')
}

export default function useMenuQuery() {
  return useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenu,
  })
}
