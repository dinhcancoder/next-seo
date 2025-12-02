'use client'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '~/components/ui/select'
import { yupResolver } from '@hookform/resolvers/yup'
import { menuSchema } from '~/lib/validators/menu'
import useMenuMutation from './hooks/useMenuMutation'
import useMenuQuery from './hooks/useMenuQuery'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { buildMenuTree, flattenMenu } from '~/utils/flattenMenu'

export default function HeaderPage() {
  const [isOpen, setIsOpen] = useState(false)

  const { data: menuList = [] } = useMenuQuery()
  const { createMenu } = useMenuMutation()

  const menuTree = buildMenuTree(menuList)
  const flatMenu = flattenMenu(menuTree)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(menuSchema),
    defaultValues: {
      label: '',
      slug: '',
      parent: null,
      order: 0,
      url: '',
      isActive: true,
    },
  })

  // 🧩 Tự động tạo slug khi nhập label
  const handleLabelChange = (e) => {
    const value = e.target.value
    const slug = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    setValue('label', value)
    setValue('slug', slug)
  }

  // 🧩 Submit form
  const onSubmit = (formData) => {
    createMenu.mutate(formData, {
      onSuccess: () => {
        reset()
        setIsOpen(false)
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Tạo Menu
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo Menu</DialogTitle>
          <DialogDescription>
            Nhập thông tin menu, nếu không chọn cấp thì menu này là menu cha.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* LABEL */}
          <div className="grid gap-2">
            <Label htmlFor="label">Tên Menu</Label>
            <Input
              id="label"
              placeholder="Ví dụ: iPhone 12"
              {...register('label')}
              onChange={handleLabelChange}
            />
            {errors.label && (
              <p className="text-red-500 text-sm">{errors.label.message}</p>
            )}
          </div>

          {/* SLUG */}
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" placeholder="iphone-12" {...register('slug')} />
            {errors.slug && (
              <p className="text-red-500 text-sm">{errors.slug.message}</p>
            )}
          </div>

          {/* PARENT SELECT */}
          <div className="grid gap-2">
            <Label>Thuộc danh mục</Label>

            <Select
              onValueChange={(value) =>
                setValue('parent', value === 'none' ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn menu cha (mặc định là menu cha)" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">— Menu cha —</SelectItem>

                {flatMenu.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.parent && (
              <p className="text-red-500 text-sm">{errors.parent.message}</p>
            )}
          </div>

          {/* ORDER */}
          <div className="grid gap-2">
            <Label htmlFor="order">Thứ tự</Label>
            <Input id="order" type="number" {...register('order')} />
          </div>

          {/* URL (optional) */}
          <div className="grid gap-2">
            <Label htmlFor="url">URL (tuỳ chọn)</Label>
            <Input id="url" placeholder="/iphone-12" {...register('url')} />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
