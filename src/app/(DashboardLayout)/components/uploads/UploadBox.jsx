'use client'

import { useDropzone } from 'react-dropzone'
import { useState } from 'react'

export default function UploadBox({
  files = [],
  maxSize = 20 * 1024 * 1024,
  onFilesSelected,
  accept = { 'image/*': [] },
  multiple = true,
  allExtension = false,
}) {
  const [showAll, setShowAll] = useState(false)

  const handleDrop = (acceptedFiles) => {
    if (!multiple) {
      onFilesSelected([acceptedFiles[0]])
      return
    }

    onFilesSelected(acceptedFiles)
  }

  const dropzoneAccept = allExtension ? undefined : accept

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: multiple,
    accept: dropzoneAccept,
    maxSize,
    onDrop: handleDrop,
  })

  return (
    <div
      {...getRootProps()}
      className={`flex min-h-[265px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-primary border-gray-300 hover:bg-blue-50'} `}
    >
      <input {...getInputProps()} />

      {/* ICON */}
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
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect4" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect4"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      {/* CHƯA CHỌN FILE */}
      {files.length === 0 && (
        <>
          <p className="mt-4 text-base text-gray-600">
            Kéo thả tập tin vào đây hoặc{' '}
            <span className="text-primary font-semibold">chọn từ thiết bị</span>
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Tối đa 20MB. Chấp nhận JPG, PNG, WEBP...
          </p>
        </>
      )}

      {/* ĐÃ CHỌN FILE */}
      {files.length > 0 && (
        <div
          className="mt-4"
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <p className="text-sm font-semibold text-green-600">
            ✨ Đã chọn {files.length} ảnh — tất cả sẵn sàng để tải lên
          </p>

          <ul className="mt-3 space-y-1.5 rounded-lg border bg-gray-50 px-3 py-2 text-xs text-gray-600">
            {(showAll ? files : files.slice(0, 2)).map((file, i) => (
              <li key={i} className="flex justify-between">
                <span className="max-w-[70%] truncate">{file.name}</span>
                <span className="text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </li>
            ))}

            {/* Toggle xem thêm */}
            {files.length > 2 && (
              <li>
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-xs text-blue-500 underline"
                >
                  {showAll
                    ? 'Thu gọn danh sách'
                    : `+ ${files.length - 2} ảnh khác`}
                </button>
              </li>
            )}
          </ul>

          <p className="text-primary mt-3 text-[13px] underline">
            Upload ảnh mới ...
          </p>
        </div>
      )}
    </div>
  )
}
