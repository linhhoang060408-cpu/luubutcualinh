'use client';

import { useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';

type ImageItem = { id: string; name: string; src: string };

type MessageData = {
  id: string;
  senderName: string;
  senderClass?: string;
  facebook?: string;
  instagram?: string;
  memorableQ?: string;
  likeQ?: string;
  secretQ?: string;
  word1?: string;
  word2?: string;
  word3?: string;
  futureWishQ?: string;
  wishQ?: string;
  freeMessage?: string;
  anonymous: boolean;
  images: ImageItem[];
  createdAt: string;
};

type Analysis = {
  traits: string[];
  wishes: string[];
  wordCloud: string[];
};

const stopWords = new Set([
  'và', 'của', 'là', 'có', 'cho', 'một', 'những', 'đã', 'cái', 'này', 'khi', 'với', 'trong', 'để', 'rất', 'nữa', 'mình', 'em', 'anh', 'cậu', 'mà', '1', '2', '3', 'là', 'và', 'đã', 'của'
]);

const guessTraits = [
  { label: 'Sáng tạo', keywords: ['ý tưởng', 'sáng tạo', 'độc đáo', 'idea'] },
  { label: 'Chăm chỉ', keywords: ['chăm chỉ', 'cố gắng', 'học', 'siêng năng', 'làm việc'] },
  { label: 'Hài hước', keywords: ['vui', 'hài', 'cười', 'vui vẻ', 'vô cùng'] },
  { label: 'Tốt bụng', keywords: ['tốt bụng', 'chân thành', 'giúp', 'quan tâm'] },
  { label: 'Có chí tiến thủ', keywords: ['ước mơ', 'hoài bão', 'khát khao', 'thành công', 'chí tiến thủ'] }
];

const extractWords = (text: string) =>
  text
    .toLowerCase()
    .replace(/[.,!?;:()”“"'\n\r]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));

const countWords = (messages: MessageData[]) => {
  const counts = new Map<string, number>();
  messages.forEach((message) => {
    const words = extractWords([
      message.memorableQ,
      message.likeQ,
      message.secretQ,
      message.futureWishQ,
      message.wishQ,
      message.freeMessage,
      message.word1,
      message.word2,
      message.word3,
    ]
      .filter(Boolean)
      .join(' '));
    words.forEach((word) => {
      counts.set(word, (counts.get(word) || 0) + 1);
    });
  });
  return counts;
};

const analyzeMessages = (messages: MessageData[]): Analysis => {
  const traits = new Set<string>();
  const wishes = new Set<string>();
  const wordCounts = countWords(messages);

  messages.forEach((message) => {
    const combined = [
      message.memorableQ,
      message.likeQ,
      message.secretQ,
      message.futureWishQ,
      message.wishQ,
      message.freeMessage,
      message.word1,
      message.word2,
      message.word3,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    guessTraits.forEach((trait) => {
      if (trait.keywords.some((keyword) => combined.includes(keyword))) {
        traits.add(trait.label);
      }
    });

    if (combined.includes('đỗ') || combined.includes('đậu') || combined.includes('đại học')) {
      wishes.add('Đỗ đại học mong muốn');
    }
    if (combined.includes('thành công') || combined.includes('giỏi') || combined.includes('vươn lên')) {
      wishes.add('Thành công trong tương lai');
    }
    if (combined.includes('nhiệt huyết') || combined.includes('đam mê') || combined.includes('mãi nhiệt')) {
      wishes.add('Luôn giữ được sự nhiệt huyết');
    }
  });

  const wordCloud = Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);

  return {
    traits: [...traits].slice(0, 6),
    wishes: [...wishes].slice(0, 5),
    wordCloud,
  };
};

const getReaction = (message: MessageData) => {
  const text = [message.likeQ, message.secretQ, message.freeMessage].filter(Boolean).join(' ').toLowerCase();
  if (text.includes('vui') || text.includes('hài') || text.includes('cười')) return '😂 Hài hước';
  if (text.includes('đáng nhớ') || text.includes('không thể quên') || text.includes('kỷ niệm')) return '⭐ Đáng nhớ';
  if (text.includes('mãi') || text.includes('giữ mãi') || text.includes('luôn nhớ')) return '🥹 Muốn lưu lại mãi';
  return '❤️ Cảm động';
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

export default function LinhDashboardPage() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [analysis, setAnalysis] = useState<Analysis>({ traits: [], wishes: [], wordCloud: [] });
  const [status, setStatus] = useState('Đang tải...');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        if (Array.isArray(data)) {
          setMessages(data);
          setStatus('');
        } else {
          setStatus('Không có dữ liệu.');
        }
      } catch {
        setStatus('Không thể tải bảng điều khiển.');
      }
    };

    fetchMessages();
  }, []);

  const summary = useMemo(() => {
    const totalImages = messages.reduce((sum, message) => sum + (message.images?.length || 0), 0);
    const totalSenders = new Set(messages.map((message) => (message.anonymous ? 'Người bí ẩn' : message.senderName || 'Người bí ẩn'))).size;
    const wordCounts = countWords(messages);
    const topWord = Array.from(wordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 1)
      .map(([word]) => word)[0] || 'linh';

    return { totalImages, totalSenders, topWord };
  }, [messages]);

  return (
    <main className="min-h-screen px-4 py-10 bg-pink-bg text-pink-text">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-[36px] border border-pink-secondary/40 bg-white/90 p-8 shadow-[0_25px_80px_rgba(255,143,177,0.18)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">Dashboard dành cho Linh</p>
              <h1 className="mt-3 text-4xl font-bold text-[#4A3240]">Chào Linh, đây là những ký ức dành riêng cho cậu.</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#7B636C]">
                Tổng hợp lời nhắn, hình ảnh và phân tích cảm xúc để giữ lại khoảnh khắc đẹp nhất trước lúc chia tay.
              </p>
            </div>
            <div className="rounded-[32px] bg-pink-secondary/80 p-5 text-center shadow-inner shadow-pink-secondary/20">
              <p className="text-sm font-semibold text-pink-text/80">Link admin</p>
              <p className="mt-3 text-2xl font-bold text-[#4A3240]">/linh-dashboard</p>
              <p className="mt-2 text-sm text-[#7B636C]">Chỉ dành riêng cho Linh.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-pink-secondary/60 bg-white/95 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">💌 Tổng số lời nhắn</p>
            <p className="mt-4 text-4xl font-bold text-[#4A3240]">{messages.length}</p>
          </div>
          <div className="rounded-3xl border border-pink-secondary/60 bg-white/95 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">📷 Tổng số ảnh</p>
            <p className="mt-4 text-4xl font-bold text-[#4A3240]">{summary.totalImages}</p>
          </div>
          <div className="rounded-3xl border border-pink-secondary/60 bg-white/95 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">❤️ Tổng số người gửi</p>
            <p className="mt-4 text-4xl font-bold text-[#4A3240]">{summary.totalSenders}</p>
          </div>
          <div className="rounded-3xl border border-pink-secondary/60 bg-white/95 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">⭐ Từ được nhắc nhiều nhất</p>
            <p className="mt-4 text-3xl font-bold text-[#4A3240]">{summary.topWord}</p>
          </div>
        </section>

        <section className="rounded-[32px] border border-pink-secondary/60 bg-white/90 p-8 shadow-[0_25px_60px_rgba(255,143,177,0.14)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">AI Phân Tích Linh</p>
              <h2 className="mt-3 text-3xl font-bold text-[#4A3240]">Từ các lời nhắn, AI gợi ý cảm nhận về Linh</h2>
            </div>
            <button
              onClick={() => setAnalysis(analyzeMessages(messages))}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-primary/20 transition hover:bg-[#ff6d95]"
            >
              <Sparkles className="h-4 w-4" /> AI Phân Tích Linh
            </button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-pink-secondary/60 bg-pink-bg/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">Mọi người nghĩ gì về Linh?</p>
              <div className="mt-4 space-y-2">
                {analysis.traits.length > 0 ? (
                  analysis.traits.map((trait) => (
                    <p key={trait} className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-[#4A3240] shadow-sm">- {trait}</p>
                  ))
                ) : (
                  <p className="text-sm text-[#7B636C]">Nhấn nút AI để xem phân tích.</p>
                )}
              </div>
            </div>
            <div className="rounded-3xl border border-pink-secondary/60 bg-pink-bg/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">Những lời chúc phổ biến nhất</p>
              <div className="mt-4 space-y-2">
                {analysis.wishes.length > 0 ? (
                  analysis.wishes.map((item) => (
                    <p key={item} className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-[#4A3240] shadow-sm">- {item}</p>
                  ))
                ) : (
                  <p className="text-sm text-[#7B636C]">Chưa có phân tích. Hãy bấm nút AI.</p>
                )}
              </div>
            </div>
            <div className="rounded-3xl border border-pink-secondary/60 bg-pink-bg/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">Word Cloud</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.wordCloud.length > 0 ? (
                  analysis.wordCloud.map((word) => (
                    <span key={word} className="rounded-full bg-white/90 px-4 py-2 text-sm text-[#4A3240] shadow-sm">
                      {word}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-[#7B636C]">Nhấn AI để tạo cloud.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-pink-secondary/60 bg-white/95 p-6 shadow-[0_25px_60px_rgba(255,143,177,0.14)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-pink-text/70">Danh sách lời nhắn</p>
              <h2 className="text-2xl font-bold text-[#4A3240]">Từng lời nhắn và kỷ niệm</h2>
            </div>
            <p className="text-sm text-[#7B636C]">Hiện có {messages.length} lời nhắn.</p>
          </div>

          {status ? (
            <div className="mt-8 rounded-3xl bg-pink-secondary/70 p-8 text-center text-sm text-[#4A3240]">{status}</div>
          ) : messages.length === 0 ? (
            <div className="mt-8 rounded-3xl bg-pink-secondary/70 p-8 text-center text-sm text-[#4A3240]">Chưa có lời nhắn nào. Hãy mời bạn bè gửi đến Linh nhé.</div>
          ) : (
            <div className="mt-8 grid gap-5">
              {messages.map((message) => (
                <article key={message.id} className="rounded-3xl border border-pink-secondary/40 bg-pink-bg/80 p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-pink-text/80">{formatDate(message.createdAt)}</p>
                      <h3 className="mt-2 text-xl font-semibold text-[#4A3240]">{message.senderName}</h3>
                      <p className="mt-2 text-sm text-[#7B636C]">{message.images?.length || 0} ảnh và {message.senderClass ? `lớp ${message.senderClass}` : 'không rõ lớp'}</p>
                    </div>
                    <span className="rounded-full bg-white px-4 py-2 text-sm text-[#4A3240] shadow-sm">{getReaction(message)}</span>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {message.memorableQ && (
                      <div className="rounded-3xl bg-white p-4 text-sm text-[#4A3240] shadow-sm">
                        <p className="font-semibold">Kỷ niệm đáng nhớ</p>
                        <p className="mt-2">{message.memorableQ}</p>
                      </div>
                    )}
                    {message.likeQ && (
                      <div className="rounded-3xl bg-white p-4 text-sm text-[#4A3240] shadow-sm">
                        <p className="font-semibold">Điều thích nhất</p>
                        <p className="mt-2">{message.likeQ}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 space-y-4">
                    {message.wishQ && (
                      <div className="rounded-3xl bg-white p-4 text-sm text-[#4A3240] shadow-sm">
                        <p className="font-semibold">Lời chúc</p>
                        <p className="mt-2">{message.wishQ}</p>
                      </div>
                    )}
                    {message.freeMessage && (
                      <div className="rounded-3xl bg-white p-4 text-sm text-[#4A3240] shadow-sm">
                        <p className="font-semibold">Nhắn gửi tự do</p>
                        <p className="mt-2">{message.freeMessage}</p>
                      </div>
                    )}
                  </div>

                  {message.images?.length > 0 && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {message.images.map((image) => (
                        <img key={image.id} src={image.src} alt={image.name} className="h-40 w-full rounded-3xl object-cover" />
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
