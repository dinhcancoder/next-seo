export default function UserItem({ u }) {
  return (
    <li>
      {u.username} - {u.email}
    </li>
  )
}
