import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart } from '../features/cart/cartSlice';

export const CheckoutPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleOrder = () => {
    dispatch(clearCart());
    setSuccessMessage(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (successMessage) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Đặt hàng thành công!</h1>
        <p className="text-gray-600 dark:text-gray-300">Cảm ơn bạn đã mua hàng. Đang chuyển hướng về trang chủ...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-6">Thanh toán đơn hàng</h1>
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex justify-between border-b pb-2 dark:border-gray-700">
            <span>{item.product.title} (x{item.quantity})</span>
            <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xl font-bold mb-6 text-red-500">
        <span>Tổng thanh toán:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <button 
        onClick={handleOrder}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
      >
        Đặt hàng
      </button>
    </div>
  );
};