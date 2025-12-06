'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'
import { useRef } from 'react'

export default function CustomSwiper(props) {
  const {
    items = [],
    renderItem,
    slidesPerView = 1,
    loop = true,
    space = 10,
    autoplay = false,

    nextButton, // optional JSX
    prevButton, // optional JSX

    showNavigation = true,
    showPagination = true,

    className = '',
    breakpoints = {},
  } = props

  const nextRef = useRef(null)
  const prevRef = useRef(null)
  const paginationRef = useRef(null)

  return (
    <div className="relative w-full">
      {/* ===========================
          CUSTOM OR DEFAULT PREV/NEXT
         =========================== */}

      {showNavigation && (
        <>
          {prevButton ? (
            // Custom button
            <div
              ref={prevRef}
              className="absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer"
            >
              {prevButton}
            </div>
          ) : (
            // Swiper default button
            <div className="swiper-button-prev" ref={prevRef} />
          )}

          {nextButton ? (
            <div
              ref={nextRef}
              className="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer"
            >
              {nextButton}
            </div>
          ) : (
            <div className="swiper-button-next" ref={nextRef} />
          )}
        </>
      )}

      {/* Pagination */}
      {showPagination && (
        <div ref={paginationRef} className="swiper-pagination mt-3" />
      )}

      {/* Swiper core */}
      <Swiper
        modules={[A11y, Navigation, Pagination, Autoplay]}
        spaceBetween={space}
        slidesPerView={slidesPerView}
        loop={loop}
        autoplay={autoplay ? { delay: 2500 } : false}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
          swiper.params.pagination.el = paginationRef.current
        }}
        breakpoints={breakpoints}
        className={className}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>{renderItem(item, i)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

/**
 * CustomSwiper Component — Fully Flexible Swiper Wrapper
 * -------------------------------------------------------
 * PROPS:
 *
 * items               : Array<any>
 *   - Danh sách dữ liệu hiển thị trong slider.
 *   - Mỗi item được render thông qua renderItem(item, index).
 *
 * renderItem          : Function(item, index)
 *   - Hàm render UI cho từng slide.
 *   - Cực kỳ linh hoạt: hình ảnh, card, video, text,...
 *
 * slidesPerView       : number | 'auto'  (default: 1)
 *   - Số lượng slide hiển thị cùng lúc.
 *
 * loop                : boolean (default: true)
 *   - Cho phép slide chạy vòng lặp.
 *
 * space               : number (default: 10)
 *   - Khoảng cách giữa các slide (px).
 *
 * autoplay            : boolean (default: false)
 *   - Nếu true => tự động chạy slider (delay 2500ms).
 *
 * -------------------------------------------------------
 * ⚡ Navigation Buttons
 *
 * nextButton          : JSX.Element | undefined
 * prevButton          : JSX.Element | undefined
 *   - Nếu truyền => sử dụng icon custom của bạn.
 *   - Nếu KHÔNG truyền => dùng navigation mặc định của Swiper.
 *
 * showNavigation      : boolean (default: true)
 *   - Bật / tắt navigation (dù có custom hay không).
 *
 * -------------------------------------------------------
 * 🟡 Pagination
 *
 * showPagination      : boolean (default: true)
 *   - Hiển thị phân trang (dấu chấm).
 *
 * -------------------------------------------------------
 * 🖥 Breakpoints (Responsive)
 *
 * breakpoints         : object (default: {})
 *   - Cấu hình responsive giống Swiper:
 *
 *   Ví dụ:
 *   {
 *     320: { slidesPerView: 1 },
 *     640: { slidesPerView: 2 },
 *     1024: { slidesPerView: 4 }
 *   }
 *
 * -------------------------------------------------------
 * 🎨 Styling
 *
 * className           : string
 *   - Custom class áp vào chính Swiper component.
 *
 *
 * -------------------------------------------------------
 * 🧩 CÁCH DÙNG — Examples
 *
 * 1) Basic slider
 * -------------------------------------------------------
 * <CustomSwiper
 *   items={images}
 *   renderItem={(img) => <img src={img.url} className="h-64 w-full" />}
 * />
 *
 *
 * 2) Autoplay + 3 items/row
 * -------------------------------------------------------
 * <CustomSwiper
 *   slidesPerView={3}
 *   autoplay={true}
 *   items={products}
 *   renderItem={(p) => <ProductCard data={p} />}
 * />
 *
 *
 * 3) Custom navigation icons
 * -------------------------------------------------------
 * <CustomSwiper
 *   items={images}
 *   renderItem={(img) => <img src={img.url} />}
 *   prevButton={<div className="p-2 bg-black/40 rounded-full">←</div>}
 *   nextButton={<div className="p-2 bg-black/40 rounded-full">→</div>}
 * />
 *
 *
 * 4) Responsive slider
 * -------------------------------------------------------
 * <CustomSwiper
 *   items={gallery}
 *   renderItem={(img) => <GalleryCard img={img} />}
 *   breakpoints={{
 *     320:   { slidesPerView: 1 },
 *     640:   { slidesPerView: 2 },
 *     1024:  { slidesPerView: 3 },
 *     1440:  { slidesPerView: 4 }
 *   }}
 * />
 *
 */
