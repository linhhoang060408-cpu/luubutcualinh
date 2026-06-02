'use client';

import React from 'react';

export default function WriteMemory() {
  return (
    <div className="p-4 min-height-screen flex items-center justify-center">
      <div className="form-container">
        <div className="flex items-center gap-2 mb-2 text-pink-500 font-medium">
          ❤️ Dành riêng cho Linh
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gửi một điều gì đó cho Linh</h1>
        <p className="text-gray-600 text-sm mb-6">
          Viết những kỷ niệm, lời chúc và cả những điều chưa dám nói. Mình sẽ giữ lại từng dòng như một cuốn nhật ký thật đẹp.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            <div>
              <label className="text-sm font-semibold text-gray-700">Họ tên</label>
              <input type="text" placeholder="Nguyễn Văn A" className="input-field" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Lớp</label>
              <input type="text" placeholder="12A1" className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Facebook</label>
              <input type="text" placeholder="facebook.com/tenban" className="input-field" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Instagram</label>
              <input type="text" placeholder="@tenban" className="input-field" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Kỷ niệm đáng nhớ nhất của cậu với Linh là gì?</label>
            <textarea placeholder="Viết về khoảnh khắc nào đó đáng nhớ của hai đứa..." rows={3} className="input-field" />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Điều cậu thích nhất ở Linh?</label>
            <textarea placeholder="Viết điều cậu thấy ấn tượng nhất ở Linh..." rows={3} className="input-field" />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Có điều gì muốn nói với Linh mà trước giờ chưa từng nói không?</label>
            <textarea placeholder="Viết nỗi lòng cậu muốn giấu đi..." rows={3} className="input-field" />
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Nếu phải mô tả Linh bằng 3 từ</label>
            <div className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="Từ 1" className="input-field" />
              <input type="text" placeholder="Từ 2" className="input-field" />
              <input type="text" placeholder="Từ 3" className="input-field" />
            </div>
          </div>

          <button type="button" className="btn-submit">
            Gửi vào hộp ký ức ✨
          </button>
        </form>
      </div>
    </div>
  );
}