'use client';
import { useState } from 'react';

export default function PublicBook({ params }: { params: { slug: string } }) {
  const [form, setForm] = useState({ senderName: '', senderClass: '', email: '', facebook: '', instagram: '', message: '', memorableQ: '', futureWishQ: '', anonymous: false });
  const [images, setImages] = useState<string[]>([]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/books/${params.slug}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, images })
    });
    if (res.ok) alert('🎉 Gửi lưu bút thành công tốt đẹp!');
    else alert('Có lỗi xảy ra.');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <form onSubmit={handleSend} className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#FF8FB1]">🌸 Gửi Lưu Bút 🌸</h2>
        <input type="text" placeholder="Họ và tên *" required className="w-full p-3 border rounded-xl" onChange={e => setForm({...form, senderName: e.target.value})} />
        <textarea required placeholder="Viết điều muốn gửi..." className="w-full p-3 border rounded-xl h-24" onChange={e => setForm({...form, message: e.target.value})} />
        <button type="submit" className="w-full pink-gradient text-white font-bold py-4 rounded-xl">Gửi Yêu Thương 💌</button>
      </form>
    </div>
  );
}