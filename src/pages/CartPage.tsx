import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';

export const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg mb-4 dark:text-gray-300">Giỏ hàng của bạn đang trống.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Quay lại mua sắm</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between border p-4 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-contain" />
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1 dark:text-white">{item.product.title}</h3>
                  <p className="text-red-500 font-bold">${item.product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  onChange={(e) => dispatch(updateQuantity({ id: item.product.id, quantity: parseInt(e.target.value) || 0 }))}
                  className="w-16 border rounded text-center py-1 dark:bg-gray-700 dark:border-gray-600"
                />
                <button onClick={() => dispatch(removeFromCart(item.product.id))} className="text-red-500 hover:text-red-700 text-sm font-medium">Xoá</button>
              </div>
            </div>
          ))}
        </div>
        <div className="border p-6 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 h-fit">
          <h2 className="text-lg font-bold mb-4">Tổng cộng</h2>
          <div className="flex justify-between mb-6 text-xl font-bold text-red-500">
            <span>Thành tiền:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};