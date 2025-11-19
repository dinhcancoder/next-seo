import { useQuery } from '@tanstack/react-query'
import { http } from '~/lib/axios'

export function useUsers() {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => (await http.get('/users')).data,
  })

  return { usersQuery }
}
