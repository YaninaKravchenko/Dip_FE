import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { myFavoritesActions } from '../../../Store/Actions/myFavoritesActions';
import { useDispatch } from 'react-redux';
import NoFavoritesMessage from './NoFavoritesMessage';
import {
  StyledPostsFavorites,
  StyledFavoriteIcon,
  StyledIconAndPosts,
  StyledTitleFavorites,
  StyledLink,
  StyledInfoBook,
  StyledPostsFavBook,
  StyledPostsFavoritesOne,
  StyledPostsFavoritesAll,
} from './styles';
import { StyledAboutBookBtn } from '../styles';
import { PostBook } from '../../../types';
import IconArrowBack from '../../IconArrowBack/IconArrowBack';
import Button from '../../Button/Button';
import { cartActions } from '../../../Store/Actions/cartActions';

const PostsFavorites = () => {
  const dispatch = useDispatch();

  const favoritePosts = useSelector(
    (state: RootState) => state.favorites.favorite
  );

  if (!favoritePosts || favoritePosts.length === 0) {
    return <NoFavoritesMessage />;
  }

  const handleRemoveFavorite = (isbn13: string) => {
    dispatch(myFavoritesActions.removeFromFavorite(isbn13));
  };
  const handleAddToCartFavorite = (book: PostBook) => {
    dispatch(cartActions.addToCart(book));
  };

  return (
    <StyledIconAndPosts>
      <IconArrowBack />
      <StyledPostsFavBook>
        <StyledPostsFavorites>
          <h2>Your Favorite Posts</h2>
          <StyledPostsFavoritesAll>
            {favoritePosts.map((post: PostBook) => (
              <StyledPostsFavoritesOne key={post.isbn13}>
                <img src={post.image} alt={post.title} />
                <StyledInfoBook>
                  <h3>{post.title}</h3>
                  <p>{post.subtitle}</p>
                  <p>{post.price}</p>
                  <StyledAboutBookBtn>
                    <StyledLink to={`/book/${post.isbn13}`}>
                      About Book
                    </StyledLink>
                    <Button onClick={() => handleAddToCartFavorite(post)}>
                      Buy
                    </Button>
                  </StyledAboutBookBtn>
                </StyledInfoBook>
                <StyledTitleFavorites>
                  <StyledFavoriteIcon
                    onClick={() => handleRemoveFavorite(post.isbn13)}
                  />
                </StyledTitleFavorites>
              </StyledPostsFavoritesOne>
            ))}
          </StyledPostsFavoritesAll>
        </StyledPostsFavorites>
      </StyledPostsFavBook>
    </StyledIconAndPosts>
  );
};

export default PostsFavorites;
