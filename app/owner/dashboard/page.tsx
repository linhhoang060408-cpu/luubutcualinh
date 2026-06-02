'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const [aiSummary, setAiSummary] = useState('');

  useEffect(() => {
    setMessages([
      { id: '1', senderName: 'Nguyễn Anh Minh', message: 'Chúc bạn luôn đỗ nguyện vọng 1 nhé!', anonymous: false },
      { id: '2', senderName: 'Người bí ẩn', message: 'Tớ thích thầm cậu 3 năm rồi đó!', anonymous: true }
    ]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-pink-text">💌 Bảng Điều Khiển Lưu Bút</h1>
      <button onClick={() => setAiSummary('Bạn là người hài hước, tốt bụng và luôn giúp đỡ mọi người!')} className="px-4 py-2 bg-[#FF8FB1] text-white rounded-lg">✨ AI Tóm Tắt</button>
      {aiSummary && <div className="p-4 bg-white rounded-xl border italic">{aiSummary}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {messages.map(m => (
          <div key={m.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-lg">{m.senderName}</h4>
            <p className="text-gray-600 mt-2">"{m.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}