import './globals.css';

export const metadata = {
  title: 'Lưu bút Linh | Lê Hoàng Linh',
  description: 'Trang lưu bút cá nhân cho Lê Hoàng Linh, nơi mọi người gửi lời nhắn và kỷ niệm đặc biệt.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-pink-bg text-pink-text selection:bg-pink-primary/30 selection:text-white">{children}</body>
    </html>
  );
}
