'use client'

import { useAuthStore } from '~/store/useAuthStore'

export default function AppHeader() {
  const { user } = useAuthStore()
  return (
    <div className="bg-linear-to-r from-slate-800 via-slate-700 to-blue-950 py-3.5 text-center text-lg text-white">
      Welcome back, {user?.username}!
    </div>
  )
}
