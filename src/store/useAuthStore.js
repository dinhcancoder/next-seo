import { create } from 'zustand'
import { apiFetch } from '~/lib/api-fetch'

export const useAuthStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchMe: async () => {
    try {
      const res = await apiFetch('/api/admin/me')
      if (!res.success) {
        set({ user: null })
        return null
      }
      set({ user: res.data })
    } catch (error) {
      set({ user: null })
      return null
    }
  },
}))
