import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiFetch } from '~/lib/api-fetch'

export default function useMenuMutation() {
  const queryClient = useQueryClient()

  const createMenu = useMutation({
    mutationFn: (payload) =>
      apiFetch('/api/menu', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['menu'])
    },
  })

  return { createMenu }
}
