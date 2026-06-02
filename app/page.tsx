'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-pink-bg text-pink-text">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-cloud cloud-one" />
        <div className="hero-cloud cloud-two" />
        <div className="sparkle sparkle-1" />
        <div className="sparkle sparkle-2" />
        <div className="sparkle sparkle-3" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-14">
        <section className="rounded-[40px] border border-pink-secondary/60 bg-white/90 p-10 shadow-[0_30px_90px_rgba(255,143,177,0.16)] backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-3 rounded-full bg-pink-secondary/80 px-5 py-3 text-sm font-semibold text-pink-text shadow-sm shadow-pink-secondary/30">
                💌 Lưu bút dành riêng cho Linh
              </p>
              <h1 className="text-5xl font-bold leading-tight text-[#4A3240] md:text-6xl">
                LÊ HOÀNG LINH
              </h1>
              <p className="text-xl font-semibold text-[#7B636C]">Những lời nhắn dành cho Linh</p>
              <p className="max-w-2xl text-base leading-8 text-[#7B636C]">
                Chào cậu. Nếu cậu đang ở đây, có lẽ chúng ta đã từng gặp nhau trong một giai đoạn nào đó của tuổi trẻ.
                Mình tạo trang này để lưu lại những lời nhắn, những kỷ niệm và những điều mọi người muốn gửi tới mình.
                Dù là một câu chuyện dài hay chỉ một lời chúc ngắn, mình đều rất trân trọng.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/write" className="inline-flex items-center justify-center rounded-full bg-pink-primary px-8 py-4 text-base font-semibold text-white shadow-xl shadow-pink-primary/30 transition hover:bg-[#ff6d95]">
                  💌 Viết lưu bút cho Linh
                </Link>
                <Link href="/linh-dashboard" className="inline-flex items-center justify-center rounded-full border border-pink-secondary/70 bg-white px-6 py-4 text-sm font-semibold text-pink-text transition hover:bg-pink-secondary/40">
                  ✨ Xem dashboard của Linh
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm rounded-[38px] border border-pink-secondary/60 bg-pink-secondary/80 p-6 shadow-[0_25px_80px_rgba(255,143,177,0.2)]">
              <div className="absolute -left-8 top-10 h-20 w-20 rounded-full bg-white/80 blur-2xl" />
              <div className="flex h-56 items-center justify-center rounded-[32px] border border-white/40 bg-white/80 shadow-inner shadow-white/50">
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#FCE8F0] text-6xl">🌸</div>
              </div>
              <div className="mt-8 space-y-4 text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-pink-text/80">Giới thiệu ngắn</p>
                <p className="text-lg font-semibold text-[#4A3240]">Một cuốn lưu bút chính là một cuốn nhật ký kỷ niệm cuối cấp dành riêng cho Linh.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[36px] border border-pink-secondary/40 bg-white/90 p-10 shadow-[0_20px_70px_rgba(255,143,177,0.12)] backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">Về Linh</p>
              <h2 className="text-3xl font-bold text-[#4A3240]">Lê Hoàng Linh</h2>
              <p className="text-base leading-8 text-[#7B636C]">
                Biệt danh: <span className="font-semibold">Linh</span>. Một người luôn mang trong mình sự dịu dàng, hoài bão và cả những ký ức ấm áp của tuổi học trò.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: '📚', label: 'Thích học hỏi' },
                { icon: '💡', label: 'Hay nghĩ ra ý tưởng mới' },
                { icon: '🎯', label: 'Luôn cố gắng phát triển bản thân' },
                { icon: '🤝', label: 'Trân trọng các mối quan hệ' },
                { icon: '🚀', label: 'Có nhiều ước mơ và hoài bão' },
              ].map((item) => (
                <div key={item.label} className="rounded-[28px] border border-pink-secondary/60 bg-pink-bg/90 px-5 py-5 shadow-sm">
                  <p className="text-3xl">{item.icon}</p>
                  <p className="mt-4 text-base font-semibold text-[#4A3240]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
