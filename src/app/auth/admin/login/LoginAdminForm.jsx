'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { apiFetch } from '~/lib/api-fetch'
import { useAuthStore } from '~/store/useAuthStore'

export default function LoginAdminForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { fetchMe } = useAuthStore()

  const redirectTo = useMemo(() => {
    const r = searchParams.get('redirectTo')
    // chặn redirect ngoài site (basic safety)
    if (!r || !r.startsWith('/')) return '/admin'
    return r
  }, [searchParams])

  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (!res.success) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || 'Đăng nhập thất bại')
        return
      }

      // login success => cookie sessionToken đã được set (httpOnly)
      await fetchMe()

      router.replace(redirectTo)
    } catch {
      setError('Đã có lỗi xảy ra!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="mt-1 text-sm text-gray-500">
          Đăng nhập để vào trang quản trị.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}
