import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 dark:border-gray-700">
      <div>
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 dark:text-white">{product.title}</h3>
        </Link>
        <p className="text-red-500 font-bold mb-4">${product.price.toFixed(2)}</p>
      </div>
      <button 
        onClick={() => dispatch(addToCart(product))}
        className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
};