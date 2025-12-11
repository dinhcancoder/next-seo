'use client'

import { Eye, Upload, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import UploadBox from '~/app/(DashboardLayout)/components/uploads/UploadBox'
import { uploadFiles } from '~/app/(DashboardLayout)/lib/upload'
import { Button } from '~/components/ui/button'
import { apiFetch } from '~/lib/api-fetch'
import { openLightbox } from '~/utils/openLightbox'

export default function LogoPage() {
  const [files, setFiles] = useState({
    logoHeader: [],
    logoFooter: [],
  })

  const [preview, setPreview] = useState({
    logoHeader: null,
    logoFooter: null,
  })

  const [contentRecord, setContentRecord] = useState(null)

  // NEW: lưu danh sách file logo cũ cần xóa khi bấm Lưu
  const [logosToDelete, setLogosToDelete] = useState([])

  useEffect(() => {
    const loadLogos = async () => {
      const res = await apiFetch('/api/contents?type=logo')
      const existing = res?.[0]
      if (!existing) return

      setContentRecord(existing)
      setPreview({
        logoHeader: existing.data?.logoHeader || null,
        logoFooter: existing.data?.logoFooter || null,
      })
    }

    loadLogos()
  }, [])

  const handleDrop = (acceptedFiles, type) => {
    const file = acceptedFiles[0]
    if (!file) return
    setFiles((prev) => ({ ...prev, [type]: [file] }))
    setPreview((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }))
  }

  const handleSave = async () => {
    const newData = { ...(contentRecord?.data || {}), ...preview }

    if (files.logoHeader.length > 0) {
      const [uploadedHeader] = await uploadFiles(files.logoHeader, 'logo')
      newData.logoHeader = uploadedHeader
    }

    if (files.logoFooter.length > 0) {
      const [uploadedFooter] = await uploadFiles(files.logoFooter, 'logo')
      newData.logoFooter = uploadedFooter
    }

    const payload = { type: 'logo', data: newData }

    if (contentRecord) {
      const updated = await apiFetch(`/api/contents/${contentRecord._id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      setContentRecord(updated)
    } else {
      const created = await apiFetch('/api/contents', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      setContentRecord(created)
    }

    // THÊM: sau khi update record mới xóa file vật lý
    if (logosToDelete.length > 0) {
      await Promise.all(
        logosToDelete.map((filePath) =>
          apiFetch('/api/delete-file', {
            method: 'POST',
            body: JSON.stringify({ filePath }),
          }),
        ),
      )
      setLogosToDelete([])
    }

    setFiles({ logoHeader: [], logoFooter: [] })
    toast.success('Cập nhật thành công.')
  }

  // ==============================
  // XÓA LOGO: CHỈ ĐÁNH DẤU & XÓA LOCAL, KHÔNG GỌI API
  // ==============================
  const handleDeleteLogo = (type) => {
    // Nếu đang có file mới chưa upload -> chỉ cần clear local
    if (files[type]?.length > 0 && !contentRecord?.data?.[type]) {
      setFiles((prev) => ({ ...prev, [type]: [] }))
      setPreview((prev) => ({ ...prev, [type]: null }))
      return
    }

    const currentUrl = contentRecord?.data?.[type]

    // Không có record trong DB thì chỉ xóa state
    if (!contentRecord || !currentUrl) {
      setFiles((prev) => ({ ...prev, [type]: [] }))
      setPreview((prev) => ({ ...prev, [type]: null }))
      return
    }

    // Đánh dấu url cần xóa khi bấm Lưu
    setLogosToDelete((prev) =>
      prev.includes(currentUrl) ? prev : [...prev, currentUrl],
    )

    // Ẩn logo khỏi UI (preview)
    setFiles((prev) => ({ ...prev, [type]: [] }))
    setPreview((prev) => ({ ...prev, [type]: null }))

    // Không gọi API, chỉ cập nhật giao diện
    // (xóa thật sẽ thực hiện ở handleSave)
  }

  // giữ nguyên như bạn yêu cầu
  const LogoUploadBlock = ({ label, type }) => (
    <div className="space-y-2">
      <span className="flex items-center gap-2.5 text-sm font-semibold text-gray-700">
        <Upload size={18} /> {label}
      </span>
      <UploadBox
        files={files[type]}
        multiple={false}
        onFilesSelected={(f) => handleDrop(f, type)}
      />
    </div>
  )

  return (
    <div className="space-y-8">
      <Button onClick={handleSave}>Lưu thay đổi</Button>

      {/* -------------------------------- HEADER SECTION -------------------------------- */}
      <div>
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Upload */}
          <LogoUploadBlock
            label="Tải lên logo cho phần header"
            type="logoHeader"
          />

          {/* Upload */}
          <LogoUploadBlock
            label="Tải lên logo cho phần footer"
            type="logoFooter"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Preview Header */}

        <div className="mx-auto w-full max-w-md">
          {preview.logoHeader && (
            <>
              <span className="mb-2.5 flex items-center justify-center gap-2.5 text-sm font-semibold text-gray-700">
                <Eye size={18} /> Xem trước Logo Header
              </span>

              <div className="relative flex w-full items-center justify-center rounded-lg">
                <img
                  onClick={() =>
                    openLightbox([
                      {
                        url: preview.logoHeader,
                        name: 'Logo Header',
                      },
                    ])
                  }
                  src={preview.logoHeader}
                  alt="Preview Header"
                  className="h-full w-full rounded-lg object-cover"
                />
                <button
                  onClick={() => handleDeleteLogo('logoHeader')}
                  className="absolute top-2 right-2 cursor-pointer rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Preview Footer */}
        <div className="mx-auto w-full max-w-md">
          {preview.logoFooter && (
            <>
              <span className="mb-2.5 flex items-center justify-center gap-2.5 text-sm font-semibold text-gray-700">
                <Eye size={18} /> Xem trước Logo Footer
              </span>

              <div className="relative flex w-full items-center justify-center rounded-lg">
                <img
                  onClick={() =>
                    openLightbox([
                      {
                        url: preview.logoFooter,
                        name: 'Logo Footer',
                      },
                    ])
                  }
                  src={preview.logoFooter}
                  alt="Preview Footer"
                  className="h-full w-full rounded-lg object-cover"
                />
                <button
                  onClick={() => handleDeleteLogo('logoFooter')}
                  className="absolute top-2 right-2 cursor-pointer rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
