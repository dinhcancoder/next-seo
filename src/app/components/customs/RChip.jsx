export function RChip(props) {
  const { children, bgColor = '#6d64eb' } = props

  const hexToRgba = (hex, alpha) => {
    const cleanHex = hex.replace('#', '')
    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const background = hexToRgba(bgColor, 0.12)

  return (
    <div
      className="inline-block rounded-full px-2 py-1 text-[13px] font-medium text-nowrap"
      style={{ backgroundColor: background, color: bgColor }}
    >
      {children}
    </div>
  )
}
