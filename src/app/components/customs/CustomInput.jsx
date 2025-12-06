'use client'

import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { Input } from '~/components/ui/input'
import { useId } from 'react'

/**
 * CustomInput Component
 * ---------------------
 * Params:
 * - label       : Text hiển thị của label
 * - type        : input | textarea | number | email | password | text
 * - placeholder : Placeholder của input/textarea
 * - className   : Custom style bao ngoài
 * - inputClass  : Custom style cho input/textarea
 * - required    : true/false
 * - disabled    : true/false
 * - value       : Controlled value
 * - onChange    : Hàm onChange(event)
 * - rows        : Số dòng cho textarea (nếu dùng textarea)
 *
 * Ví dụ dùng:
 * <CustomInput label="Tên SP" placeholder="Nhập tên" />
 * <CustomInput type="textarea" rows={5} />
 * <CustomInput type="number" label="Giá" />
 * <CustomInput required onChange={(e) => setData(e.target.value)} />
 */

export default function CustomInput({
  label = 'Label',
  type = 'input',
  placeholder = 'Enter here...',
  className = '',
  inputClass = '',
  required = false,
  disabled = false,
  value,
  onChange,
  rows = 4,
  id, // cho phép truyền id tùy ý
}) {
  const autoId = useId()
  const finalId = id || autoId

  const isTextarea = type === 'textarea'

  return (
    <div className={`grid w-full gap-2 ${className}`}>
      {/* Label */}
      {label && (
        <Label htmlFor={finalId} className="font-medium">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      )}

      {/* Input hoặc Textarea */}
      {isTextarea ? (
        <Textarea
          id={finalId}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <Input
          id={finalId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
      )}
    </div>
  )
}
