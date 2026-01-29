import { Suspense } from 'react'
import LoginAdminForm from './LoginAdminForm'

export default function LoginAdminPage() {
  return (
    <Suspense fallback={null}>
      <LoginAdminForm />
    </Suspense>
  )
}
