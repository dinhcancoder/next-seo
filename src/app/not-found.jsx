import Image from 'next/image'
import Link from 'next/link'
import { Button } from '~/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <Image
            className="mx-auto w-2/6 max-md:w-2/3"
            width={0}
            height={0}
            src="/not-found.svg"
            alt=""
          />
          <p className="mx-auto w-2/6 text-gray-500 max-md:w-[85%]">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Vui lòng
            kiểm tra lại đường dẫn hoặc quay về trang chủ.
          </p>
        </div>
        <Link href="/">
          <Button className="mt-2 cursor-pointer">Quay về trang chủ</Button>
        </Link>
      </div>
    </div>
  )
}
