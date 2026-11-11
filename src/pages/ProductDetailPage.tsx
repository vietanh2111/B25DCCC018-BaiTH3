import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Đang tải chi tiết...</div>;
  if (!product) return <div className="text-center py-10">Không tìm thấy sản phẩm!</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-8">
      <img src={product.image} alt={product.title} className="w-full md:w-1/3 h-80 object-contain" />
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <span className="text-xs uppercase bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">{product.category}</span>
          <h1 className="text-2xl font-bold mt-2 mb-4 dark:text-white">{product.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
          <p className="text-2xl font-bold text-red-500 mb-6">${product.price.toFixed(2)}</p>
        </div>
        <button 
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition w-fit"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};