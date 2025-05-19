import React from 'react';
import { useCart } from '../contexts/CartContext';
//import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button className="btn-quantity" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="btn-quantity" onClick={() => increaseQuantity(item.id)}>+</button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <strong>Total: </strong>${totalPrice.toFixed(2)}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
  <button className="btn-primary" onClick={clearCart}>Clear Cart</button>
  <button className="btn-primary">Proceed to Checkout</button>
</div>

        </>
      )}
    </div>
  );
};

export default Cart;
