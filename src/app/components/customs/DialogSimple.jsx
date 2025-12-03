import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function DialogSimple(props) {
  const { isVisible = false, setIsVisible } = props

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[625px]">
        <form>
          <DialogHeader className="mb-5">
            <DialogTitle>Thêm người dùng mới</DialogTitle>
            <DialogDescription>
              Điền các thông tin bên dưới để tạo người dùng mới.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <div className="grid gap-2.5">
                <Label>Tên vai trò</Label>
                <Input placeholder="Admin / Nhân viên..." />
                {/* <span className='text-sm text-red-500'>Tên vai trò là bắt buộc</span> */}
              </div>
            </div>

            <div className="col-span-6">
              <div className="grid gap-2.5">
                <Label>Mô tả</Label>
                <Input placeholder="Vai trò dùng để..." />
                {/* <span className='text-sm text-red-500'>Mô tả là bắt buộc</span> */}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Quay lại</Button>
            </DialogClose>
            <Button type="submit">Thêm vai trò</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogSimple
