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
} from './styles';
import { Link } from 'react-router-dom';
import { PostBook } from '../../../types';
import IconArrowBack from '../../IconArrowBack/IconArrowBack';

const PostsFavorites = () => {
  const dispatch = useDispatch();
  // Здесь мы получаем избранные посты из Redux store:
  const favoritePosts = useSelector(
    (state: RootState) => state.favorites.favorite
  );

  // Если нет избранных постов, показать сообщение
  if (!favoritePosts || favoritePosts.length === 0) {
    return <NoFavoritesMessage />;
  }

  const handleRemoveFavorite = (isbn13: string) => {
    dispatch(myFavoritesActions.removeFromFavorite(isbn13));
  };

  // И отображаем список избранных постов:
  return (
    <StyledIconAndPosts>
      <Link to='/'>
        <IconArrowBack />
      </Link>
      <StyledPostsFavorites>
        <h2>Your Favorite Posts</h2>
        {favoritePosts.map((post: PostBook) => (
          <div key={post.isbn13}>
            <StyledTitleFavorites>
              <h3>{post.title}</h3>
              <StyledFavoriteIcon
                onClick={() => handleRemoveFavorite(post.isbn13)}
              />
            </StyledTitleFavorites>
            <img src={post.image} alt={post.title} />
            <StyledInfoBook>
              <p>{post.subtitle}</p>
              <StyledLink to={`/book/${post.isbn13}`}>About Book</StyledLink>
            </StyledInfoBook>
          </div>
        ))}
      </StyledPostsFavorites>
    </StyledIconAndPosts>
  );
};

export default PostsFavorites;
