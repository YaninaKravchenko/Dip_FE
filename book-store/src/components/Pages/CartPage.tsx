import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../Store/Actions/cartActions';
import {
  StyledCartModal,
  StyledCloseButton,
  StyledCartModalDiv,
  StyledCartModalH3,
  StyledCartModalImg,
  StyledCartModalP,
  StyledCartModalBtn,
  StyledCartModalAllBtn,
  StyledCartModalPAllBtn,
  StyledDeleteForeverIcon,
  StyledCartModalBtnIcon,
  StyledCartModalTotal,
  StyledCartModalImgTitleCounter,
  StyledCartModalTotalBtn,
  StyledClearIconCart,
} from './styles';
import { modalActions } from '../../Store/Actions/modalActions';
import { CartItem } from '../../Store/Reducers/cartReducers';
import Button from '../Button/Button';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCost = useSelector((state: RootState) => state.cart.totalCost);
  const isCartModalVisible = useSelector(
    (state: RootState) => state.modal.isCartModalVisible
  );

  const handleRemoveFromCart = (isbn13: string) => {
    console.log('Removing book with isbn13:', isbn13);
    dispatch(cartActions.removeFromCart(isbn13));
  };

  const handleCloseModal = () => {
    dispatch(modalActions.toggleCartModal());
  };

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  const handleIncrementBookCount = (isbn13: string) => {
    dispatch(cartActions.incrementBookCount(isbn13));
  };

  const handleDecrementBookCount = (isbn13: string) => {
    dispatch(cartActions.decrementBookCount(isbn13));
  };

  useEffect(() => {
    console.log('CartPage re-rendered. Modal visibility:', isCartModalVisible);
  }, [isCartModalVisible]);

  return (
    <div>
      {isCartModalVisible && (
        <StyledCartModal>
          <StyledCloseButton onClick={handleCloseModal}>
            <StyledClearIconCart />
          </StyledCloseButton>
          <h2>Your Order:</h2>
          {cartItems.map(
            (book: CartItem) =>
              book.details && (
                <StyledCartModalDiv key={book.details.isbn13}>
                  <StyledCartModalImgTitleCounter>
                    <StyledCartModalImg
                      src={book.details.image}
                      alt={book.details.title}
                    />
                    <StyledCartModalPAllBtn>
                      <StyledCartModalH3>
                        {book.details.title}
                      </StyledCartModalH3>
                      <StyledCartModalP>
                        {book.details.price} * {book.count} = $
                        {parseFloat(
                          (
                            parseFloat(
                              book.details.price
                                .replace('$', '')
                                .replace(',', '')
                            ) * book.count
                          ).toFixed(2)
                        )}
                      </StyledCartModalP>
                      <StyledCartModalAllBtn>
                        <StyledCartModalBtn
                          onClick={() =>
                            handleDecrementBookCount(book.details.isbn13)
                          }
                        >
                          -
                        </StyledCartModalBtn>
                        <StyledCartModalBtn
                          onClick={() =>
                            handleIncrementBookCount(book.details.isbn13)
                          }
                        >
                          +
                        </StyledCartModalBtn>{' '}
                      </StyledCartModalAllBtn>{' '}
                    </StyledCartModalPAllBtn>
                  </StyledCartModalImgTitleCounter>
                  <StyledCartModalBtnIcon
                    onClick={() => handleRemoveFromCart(book.details.isbn13)}
                  >
                    <StyledDeleteForeverIcon />
                  </StyledCartModalBtnIcon>
                </StyledCartModalDiv>
              )
          )}
          <StyledCartModalTotalBtn>
            <StyledCartModalTotal>Total: ${totalCost}</StyledCartModalTotal>
            <Button onClick={handleClearCart}>Clear the cart</Button>
          </StyledCartModalTotalBtn>
        </StyledCartModal>
      )}
    </div>
  );
};
export default CartPage;
