import { ShoppingCart, UserRound } from 'lucide-react'

export default function HeaderRight() {
  return (
    <div className="hidden items-center gap-6 lg:flex">
      <ShoppingCart size={19} className="cursor-pointer" />
      <UserRound size={20} className="cursor-pointer" />
    </div>
  )
}
