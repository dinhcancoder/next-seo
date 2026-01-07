'use client'

import { useEffect, useRef } from 'react'
import { useAuthStore } from '~/store/useAuthStore'

export default function AuthAdminProvider({ children, initialUser = null }) {
  const didInitRef = useRef(false)
  const { fetchMe, setUser } = useAuthStore()

  useEffect(() => {
    if (didInitRef.current) return
    didInitRef.current = true

    if (initialUser) {
      setUser(initialUser)
    }
    fetchMe()
  }, [fetchMe, initialUser, setUser])

  return children
}
