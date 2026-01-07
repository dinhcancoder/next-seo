'use client'

import { useAuthStore } from '~/store/useAuthStore'

export default function AppHeader({ initialUser = null }) {
  const { user } = useAuthStore()
  const displayUser = user ?? initialUser
  const username = displayUser?.username
  return (
    <div className="bg-linear-to-r from-slate-800 via-slate-700 to-blue-950 py-3.5 text-center text-lg text-white">
      {username ? `Welcome back, ${username}!` : 'Welcome back!'}
    </div>
  )
}
