export function buildAdminUser(payload) {
  if (!payload?.userId) return null
  return {
    id: payload.userId,
    username: 'Admin',
    email: 'admin@gmail.com',
    role: 'admin',
  }
}
