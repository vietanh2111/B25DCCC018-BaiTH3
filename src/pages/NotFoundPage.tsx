import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Không tìm thấy trang bạn yêu cầu.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Về trang chủ</Link>
    </div>
  );
};