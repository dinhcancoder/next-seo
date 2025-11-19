'use client'

import UserItem from './UserItem'

export default function UserClient({ users }) {
  return (
    <ul>
      {users.map((u) => (
        <UserItem key={u._id} u={u} />
      ))}
    </ul>
  )
}
