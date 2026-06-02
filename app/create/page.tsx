'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBook() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', slug: '', theme: 'pink', coverImage: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/owner/dashboard?slug=${data.slug}`);
    } else alert("Lỗi khi tạo!");
  };

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold text-pink-text text-center">🌸 Tạo Lưu Bút 🌸</h2>
        <input required type="text" placeholder="Tên lưu bút (Ví dụ: Lớp 12A1)" className="w-full p-3 border rounded-xl" onChange={e => setForm({...form, title: e.target.value})} />
        <input required type="text" placeholder="Đường dẫn viết liền (Ví dụ: linh-12a1)" className="w-full p-3 border rounded-xl" onChange={e => setForm({...form, slug: e.target.value})} />
        <button type="submit" className="w-full bg-[#FF8FB1] text-white py-3 rounded-xl font-bold">Kích Hoạt Ngay 🚀</button>
      </form>
    </div>
  );
}