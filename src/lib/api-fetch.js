export async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include', // nếu dùng cookie HttpOnly (auth)
  })

  let data
  try {
    data = await res.json()
  } catch {
    data = null
  }

  if (!res.ok) {
    const error = new Error(data?.message || 'Request failed')
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}
