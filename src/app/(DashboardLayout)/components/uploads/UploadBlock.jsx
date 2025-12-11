export default function UploadBlock({ preview, files, label, type }) {
  return (
    <div className="space-y-2">
      <span className="block text-sm font-semibold text-gray-700">{label}</span>

      {preview[type] && (
        <Image
          src={preview[type]}
          width={180}
          height={80}
          alt={`${label} Preview`}
          className="mb-3 rounded border bg-white object-contain p-2"
        />
      )}

      <UploadBox
        files={files[type]}
        multiple={false}
        onFilesSelected={(f) => handleDrop(f, type)}
      />
    </div>
  )
}
