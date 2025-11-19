'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function GlobalLoading() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    let timer
    if (isFetching + isMutating !== 0) {
      timer = setTimeout(() => setShowLoading(true), 800)
    } else {
      clearTimeout(timer)
      setShowLoading(false)
    }

    return () => clearTimeout(timer)
  }, [isFetching, isMutating])

  if (!showLoading) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(255,255,255,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div className="loader">Loading...</div>
    </div>
  )
}
