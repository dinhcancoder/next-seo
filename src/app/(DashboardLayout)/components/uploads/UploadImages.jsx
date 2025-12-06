'use client'

import { useEffect, useState, useRef } from 'react'
import { apiFetch } from '~/lib/api-fetch'
import { X } from 'lucide-react'
import CustomSwiper from '~/app/components/customs/CustomSwiper'
import CustomInput from '~/app/components/customs/CustomInput'
import { toast } from 'react-toastify'
import { Button } from '~/components/ui/button'

export default function UploadImages({
  type = 'general',
  buttonText = 'Lưu thiết lập',
  showPreview = true,
}) {
  const [files, setFiles] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
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
      setTitle(existing?.title || '')
      setDesc(existing?.desc || '')

      // Convert string → object { url, order, name }
      setExistingImages(
        (existing?.data || []).map((img, i) =>
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
          title,
          desc,
          slug: `${type}-module`,
          data: finalImages,
        }),
      })
      setContentRecord(created)
    }
    // CASE 2: UPDATE
    else {
      const updated = await apiFetch(`/api/contents/${contentRecord._id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, desc, data: finalImages }),
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
    toast.success('Thao tác thành công.')
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        {/* UPLOAD BOX */}
        <label
          htmlFor="fileInput"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 hover:bg-gray-100"
        >
          <svg
            className="h-auto w-16 shrink-0"
            width={71}
            height={51}
            viewBox="0 0 71 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.55172 8.74547L17.7131 6.88524V40.7377L12.8018 41.7717C9.51306 42.464 6.29705 40.3203 5.67081 37.0184L1.64319 15.7818C1.01599 12.4748 3.23148 9.29884 6.55172 8.74547Z"
              stroke="currentColor"
              strokeWidth={2}
              className="stroke-blue-600 dark:stroke-blue-500"
            />
            <path
              d="M64.4483 8.74547L53.2869 6.88524V40.7377L58.1982 41.7717C61.4869 42.464 64.703 40.3203 65.3292 37.0184L69.3568 15.7818C69.984 12.4748 67.7685 9.29884 64.4483 8.74547Z"
              stroke="currentColor"
              strokeWidth={2}
              className="stroke-blue-600 dark:stroke-blue-500"
            />
            <g filter="url(#filter4)">
              <rect
                x="17.5656"
                y={1}
                width="35.8689"
                height="42.7541"
                rx={5}
                stroke="currentColor"
                strokeWidth={2}
                className="stroke-blue-600 dark:stroke-blue-500"
                shapeRendering="crispEdges"
              />
            </g>
            <path
              d="M39.4826 33.0893C40.2331 33.9529 41.5385 34.0028 42.3537 33.2426L42.5099 33.0796L47.7453 26.976L53.4347 33.0981V38.7544C53.4346 41.5156 51.1959 43.7542 48.4347 43.7544H22.5656C19.8043 43.7544 17.5657 41.5157 17.5656 38.7544V35.2934L29.9728 22.145L39.4826 33.0893Z"
              className="fill-blue-50 stroke-blue-600 dark:fill-blue-900/50 dark:stroke-blue-500"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={2}
            />
            <circle
              cx="40.0902"
              cy="14.3443"
              r="4.16393"
              className="fill-blue-50 stroke-blue-600 dark:fill-blue-900/50 dark:stroke-blue-500"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={2}
            />
            <defs>
              <filter
                id="filter4"
                x="13.5656"
                y={0}
                width="43.8689"
                height="50.7541"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy={3} />
                <feGaussianBlur stdDeviation="1.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect4"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect4"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <span className="mt-5 text-base text-gray-600">
            Kéo thả tập tin vào đây hoặc{' '}
            <span className="text-primary">chọn từ thiết bị</span>
          </span>
          <span className="mt-2 text-sm text-gray-400">
            Vui lòng chọn tập tin không vượt quá 20MB
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

        <Button
          onClick={handleSave}
          className="w-full cursor-pointer rounded-lg py-5 text-white"
        >
          {buttonText}
        </Button>
      </div>

      <div>
        <CustomInput
          label={`Tên SEO`}
          placeholder="Slider công ty..."
          inputClass="mb-5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CustomInput
          type="textarea"
          label={`Mô tả ngắn`}
          placeholder="Mô tả bất kỳ điều gì đó ..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          inputClass="mb-5"
        />
        {/* SLIDER PREVIEW */}
        {showPreview &&
          (existingImages.length > 0 || previewImages.length > 0) && (
            <>
              <div className="mb-2 text-sm font-semibold text-gray-600">
                Demo Slider
              </div>
              <CustomSwiper
                items={[...existingImages, ...previewImages]}
                renderItem={(img) => (
                  <img
                    src={img.url}
                    className="h-96 w-full rounded-lg object-cover"
                  />
                )}
                autoplay={true}
              />
              <div className="my-2 text-sm font-semibold text-gray-600">
                Demo Slider List
              </div>
              <CustomSwiper
                slidesPerView="3"
                items={[...existingImages, ...previewImages]}
                renderItem={(img) => (
                  <div className="flex flex-col overflow-hidden rounded-xl border bg-gray-200">
                    <div className="relative w-full">
                      <img
                        src={img.url}
                        className="h-52 w-full object-cover"
                        alt=""
                      />
                    </div>

                    <div className="mt-2 flex flex-col px-3 py-4 pt-1">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {img.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        order: {img.order}
                      </p>
                    </div>
                  </div>
                )}
                autoplay={true}
              />
            </>
          )}
      </div>
    </div>
  )
}
