import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../Store/Actions/cartActions';
import { StyledCartModal, StyledCloseButton } from './styles';
import { modalActions } from '../../Store/Actions/modalActions';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCost = useSelector((state: RootState) => state.cart.totalCost);
  const isCartModalVisible = useSelector(
    (state: RootState) => state.modal.isCartModalVisible
  );

  const handleRemoveFromCart = (isbn13: string) => {
    dispatch(cartActions.removeFromCart(isbn13));
  };

  const handleCloseModal = () => {
    dispatch(modalActions.toggleCartModal());
  };

  const handleClearCart = () => {
    cartItems.forEach((book) => {
      dispatch(cartActions.removeFromCart(book.isbn13));
    });
  };

  useEffect(() => {
    console.log('CartPage re-rendered. Modal visibility:', isCartModalVisible);
  }, [isCartModalVisible]);

  return (
    <div>
      {isCartModalVisible && (
        <StyledCartModal>
          <StyledCloseButton onClick={handleCloseModal}>X</StyledCloseButton>
          {cartItems.map((book) => (
            <div key={book.isbn13}>
              <h3>{book.title}</h3>
              <p>{book.price}</p>
              <button onClick={() => handleRemoveFromCart(book.isbn13)}>
                х
              </button>
            </div>
          ))}
          <div>Общая сумма: ${totalCost}</div>
          <button onClick={handleClearCart}>Очистить корзину</button>
        </StyledCartModal>
      )}
    </div>
  );
};

export default CartPage;
