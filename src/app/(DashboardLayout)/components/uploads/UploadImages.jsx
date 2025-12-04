'use client'

import { useEffect, useState, useRef } from 'react'
import { apiFetch } from '~/lib/api-fetch'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '~/components/ui/carousel'
import { X } from 'lucide-react'

export default function UploadImages({
  type = 'general',
  buttonText = 'Lưu thiết lập',
  showPreview = false,
}) {
  const [files, setFiles] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [deletedImages, setDeletedImages] = useState([])
  const [contentRecord, setContentRecord] = useState(null)

  const fileInputRef = useRef(null)

  // ============================================
  // LOAD CONTENT
  // ============================================
  useEffect(() => {
    const load = async () => {
      const res = await apiFetch(`/api/contents?type=${type}`)
      const existing = res?.[0] || null

      setContentRecord(existing)

      // Convert string → object { url, order, name }
      setExistingImages(
        (existing?.data?.images || []).map((img, i) =>
          typeof img === 'string' ? { url: img, order: i + 1, name: '' } : img,
        ),
      )
    }
    load()
  }, [type])

  // ============================================
  // SELECT NEW FILES
  // ============================================
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    const previews = selectedFiles.map((file, idx) => ({
      url: URL.createObjectURL(file),
      file,
      order: existingImages.length + idx + 1,
      name: file.name.replace(/\.[^/.]+$/, ''),
    }))

    setFiles(selectedFiles)
    setPreviewImages(previews)
  }

  // ============================================
  // UPDATE ORDER / NAME
  // ============================================
  const updateOrder = (type, index, value) => {
    const list = type === 'existing' ? [...existingImages] : [...previewImages]
    list[index].order = Number(value)

    if (type === 'existing') setExistingImages(list)
    else setPreviewImages(list)
  }

  const sortAfterBlur = (type) => {
    const list = type === 'existing' ? [...existingImages] : [...previewImages]
    const sorted = list.sort((a, b) => a.order - b.order)

    if (type === 'existing') setExistingImages(sorted)
    else setPreviewImages(sorted)
  }

  const updateName = (type, index, value) => {
    const list = type === 'existing' ? [...existingImages] : [...previewImages]
    list[index].name = value
    type === 'existing' ? setExistingImages(list) : setPreviewImages(list)
  }

  // ============================================
  // REMOVE NEW PREVIEW
  // ============================================
  const removePreview = (index) => {
    const f = [...files]
    const p = [...previewImages]
    f.splice(index, 1)
    p.splice(index, 1)
    setFiles(f)
    setPreviewImages(p)
  }

  // ============================================
  // REMOVE EXISTING
  // ============================================
  const markDeleteExisting = (url) => {
    setExistingImages(existingImages.filter((img) => img.url !== url))
    setDeletedImages([...deletedImages, url])
  }

  // ============================================
  // UPLOAD FILES
  // ============================================
  const uploadFiles = async () => {
    if (!files.length) return []

    const form = new FormData()
    form.append('type', type)
    files.forEach((file) => form.append('files', file))

    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    })

    const uploadData = await uploadRes.json()
    return uploadData.files || []
  }

  // ============================================
  // SAVE ALL
  // ============================================
  const handleSave = async () => {
    const uploadedUrls = await uploadFiles()

    // Convert uploaded → object
    const uploadedObjects = uploadedUrls.map((url, i) => ({
      url,
      order: previewImages[i].order,
      name: previewImages[i].name,
    }))

    // Merge, sort
    const finalImages = [...existingImages, ...uploadedObjects].sort(
      (a, b) => a.order - b.order,
    )

    // CASE 1: CREATE
    if (!contentRecord) {
      const created = await apiFetch('/api/contents', {
        method: 'POST',
        body: JSON.stringify({
          type,
          title: `${type} module`,
          slug: `${type}-module`,
          data: { images: finalImages },
        }),
      })
      setContentRecord(created)
    }
    // CASE 2: UPDATE
    else {
      const updated = await apiFetch(`/api/contents/${contentRecord._id}`, {
        method: 'PUT',
        body: JSON.stringify({ data: { images: finalImages } }),
      })
      setContentRecord(updated)
    }

    // DELETE REAL FILES
    for (const img of deletedImages) {
      await fetch('/api/delete-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: img }),
      })
    }

    // RESET STATE
    setDeletedImages([])
    setFiles([])
    setPreviewImages([])
    if (fileInputRef.current) fileInputRef.current.value = ''

    // UPDATE UI
    setExistingImages(finalImages)
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="max-w-2xl space-y-6">
      {/* UPLOAD BOX */}
      <label
        htmlFor="fileInput"
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 hover:bg-gray-100"
      >
        <span className="text-lg text-gray-600">Nhấp để chọn hình ảnh</span>
        <span className="mt-2 text-sm text-gray-400">
          Bạn có thể chọn nhiều tập tin
        </span>

        <input
          id="fileInput"
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* EXISTING IMAGES */}
      {existingImages.length > 0 && (
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-700">
            Hình ảnh hiện có
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {existingImages.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative">
                  <img src={img.url} className="h-36 w-full object-cover" />

                  <button
                    onClick={() => markDeleteExisting(img.url)}
                    className="absolute top-2 right-2 rounded-full bg-red-600/90 p-1 text-white shadow hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-2 border-t bg-gray-50 p-3">
                  <div className="grid grid-cols-[35px_1fr] gap-2">
                    <div className="flex flex-col">
                      <label className="text-[11px] font-medium text-gray-500">
                        Vị trí
                      </label>
                      <input
                        type="text"
                        className="rounded-md border px-2 py-1 text-xs"
                        value={img.order}
                        onChange={(e) =>
                          updateOrder('existing', i, e.target.value)
                        }
                        onBlur={() => sortAfterBlur('existing')}
                      />
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <label className="text-[11px] font-medium text-gray-500">
                        Tên SEO
                      </label>
                      <input
                        className="w-full rounded-md border px-2 py-1 text-xs"
                        value={img.name}
                        onChange={(e) =>
                          updateName('existing', i, e.target.value)
                        }
                        placeholder="Tên SEO"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW PREVIEW IMAGES */}
      {previewImages.length > 0 && (
        <div>
          <div className="mb-2 text-sm font-semibold text-gray-600">
            Hình ảnh mới
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {previewImages.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative">
                  <img src={item.url} className="h-36 w-full object-cover" />

                  <button
                    onClick={() => removePreview(i)}
                    className="absolute top-2 right-2 rounded-full bg-red-600/90 p-1 text-white shadow hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-2 border-t bg-gray-50 p-3">
                  <div className="grid grid-cols-[35px_1fr] gap-2">
                    {/* CỘT 1 */}
                    <div className="flex flex-col">
                      <label className="text-[11px] font-medium text-gray-500">
                        Vị trí
                      </label>
                      <input
                        type="text"
                        className="rounded-md border px-2 py-1 text-xs"
                        value={item.order}
                        onChange={(e) =>
                          updateOrder('preview', i, e.target.value)
                        }
                        onBlur={() => sortAfterBlur('preview')}
                        placeholder="0"
                      />
                    </div>

                    {/* CỘT 2 */}
                    <div className="flex min-w-0 flex-col">
                      <label className="text-[11px] font-medium text-gray-500">
                        Tên SEO
                      </label>
                      <input
                        className="w-full rounded-md border px-2 py-1 text-xs"
                        value={item.name}
                        onChange={(e) =>
                          updateName('preview', i, e.target.value)
                        }
                        placeholder="Tên SEO"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SLIDER PREVIEW */}
      {showPreview &&
        (existingImages.length > 0 || previewImages.length > 0) && (
          <>
            <div className="mb-2 text-sm font-semibold text-gray-600">
              Xem trước Slider
            </div>

            <Carousel className="w-full">
              <CarouselContent>
                {[...existingImages, ...previewImages]
                  .sort((a, b) => a.order - b.order)
                  .map((img, i) => (
                    <CarouselItem key={i}>
                      <img
                        src={img.url}
                        className="h-64 w-full rounded-lg object-cover"
                      />
                    </CarouselItem>
                  ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </>
        )}

      <button
        onClick={handleSave}
        className="bg-primary w-full cursor-pointer rounded-lg px-6 py-2.5 text-white"
      >
        {buttonText}
      </button>
    </div>
  )
}
