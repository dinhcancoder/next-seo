'use client'
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import Logo from './header/Logo'

export default function Footer({ logoSrc, brandName = 'Thương hiệu của bạn' }) {
  const companyLinks = [
    { label: 'Về chúng tôi', href: '#' },
    { label: 'Tuyển dụng', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Báo chí', href: '#' },
  ]

  const productLinks = [
    { label: 'Tính năng', href: '#' },
    { label: 'Bảng giá', href: '#' },
    { label: 'Bảo mật', href: '#' },
    { label: 'Lộ trình phát triển', href: '#' },
  ]

  const legalLinks = [
    { label: 'Chính sách bảo mật', href: '#' },
    { label: 'Điều khoản sử dụng', href: '#' },
    { label: 'Chính sách Cookie', href: '#' },
    { label: 'Liên hệ', href: '#' },
  ]

  const socialLinks = [
    { icon: <Twitter size={20} />, label: 'Twitter', href: '#' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', href: '#' },
    { icon: <Github size={20} />, label: 'GitHub', href: '#' },
    { icon: <Instagram size={20} />, label: 'Instagram', href: '#' },
  ]

  return (
    <footer className="bg-gradient-to-b from-slate-950 to-slate-800 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-6 py-12 md:py-14">
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-2 text-2xl font-semibold text-white md:text-3xl">
              Nhận tin hỗ trợ
            </h3>
            <p className="mb-6 text-slate-400">
              Nhận các bản cập nhật, ưu đãi và chia sẻ hữu ích được gửi về email
              của bạn mỗi tuần.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 transition focus:border-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
              <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="mb-4 flex flex-col gap-2">
              <Logo logoSrc={logoSrc} />
              <span className="text-xl font-semibold text-white">
                {brandName}
              </span>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Mang đến trải nghiệm số cao cấp với thiết kế chỉn chu và công nghệ
              hiện đại. Lựa chọn đáng tin cậy của nhiều thương hiệu và doanh
              nghiệp.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-slate-400 transition hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
              Công ty
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
              Sản phẩm
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
              Pháp lý
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto flex flex-col gap-4 p-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brandName}. Đã đăng ký bản quyền.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-slate-300">
              Sơ đồ trang
            </a>
            <a href="#" className="transition hover:text-slate-300">
              Trạng thái hệ thống
            </a>
            <a href="#" className="transition hover:text-slate-300">
              Đối tác
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
