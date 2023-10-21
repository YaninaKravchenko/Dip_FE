import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../Store/Actions/cartActions';
import { StyledCartModal, StyledCloseButton } from './styles';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCost = useSelector((state: RootState) => state.cart.totalCost);

  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleRemoveFromCart = (isbn13: string) => {
    dispatch(cartActions.removeFromCart(isbn13));
  };

  return (
    <div>
      <button onClick={() => setIsCartVisible(true)}>Открыть корзину</button>

      {isCartVisible && (
        <StyledCartModal>
          <StyledCloseButton onClick={() => setIsCartVisible(false)}>
            X
          </StyledCloseButton>
          {cartItems.map((book) => (
            <div key={book.isbn13}>
              <h3>{book.title}</h3>
              <p>{book.price}</p>
              <button onClick={() => handleRemoveFromCart(book.isbn13)}>
                Удалить
              </button>
            </div>
          ))}
          <p>Общая стоимость: {totalCost}</p>
        </StyledCartModal>
      )}
    </div>
  );
};

export default CartPage;
