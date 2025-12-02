import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/your-logo.png"
        alt="Your Logo"
        width={175} // bạn đổi size tùy ý
        height={175}
        priority // load nhanh trên header
        className="object-contain"
      />
    </Link>
  )
}
