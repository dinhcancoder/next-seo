'use client'

import { useEffect } from 'react'
import { useAuthStore } from '~/store/useAuthStore'

export default function AuthAdminProvider({ children }) {
  const { fetchMe } = useAuthStore()
  useEffect(() => {
    fetchMe()
  }, [])
  return children
}
