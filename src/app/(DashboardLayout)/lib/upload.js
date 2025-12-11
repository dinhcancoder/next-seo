export const uploadFiles = async (files, type) => {
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
