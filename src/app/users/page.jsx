import UserClient from './components/UserClient'

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export default async function UserPage() {
  const users = await getUsers()

  return <UserClient users={users} />
}
