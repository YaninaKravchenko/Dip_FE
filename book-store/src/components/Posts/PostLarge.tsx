import React from 'react';
import { ContentWrapper, PostWrapper, TextContent, StyledPost } from './styles';
import { PostBook } from '../../types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { myFavoritesActions } from '../../Store/Actions/myFavoritesActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';

interface IPostLargeProps {
  postData: PostBook;
  index: number;
}

const PostLarge: React.FC<IPostLargeProps> = ({ postData, index }) => {
  const dispatch = useDispatch();
  const favoritePosts = useSelector(
    (state: RootState) => state.favorites.favorite
  );
  const postIsFavorite = favoritePosts.some(
    (post) => post.isbn13 === postData.isbn13
  );

  const backgroundColor =
    index % 4 === 0
      ? 'purple'
      : index % 4 === 1
      ? 'blue'
      : index % 4 === 2
      ? 'blue'
      : 'yellow';

  // const handleAddToFavorite = () => {
  //   dispatch(myFavoritesActions.addToFavorite(postData.isbn13));
  // };

  const handleAddToFavorite = () => {
    if (postIsFavorite) {
      dispatch(myFavoritesActions.removeFromFavorite(postData.isbn13));
    } else {
      dispatch(myFavoritesActions.addToFavorite(postData));
    }
  };

  return (
    <StyledPost>
      <PostWrapper>
        <ContentWrapper>
          <TextContent>
            <div style={{ backgroundColor }}>
              {postIsFavorite ? (
                <FavoriteIcon
                  onClick={handleAddToFavorite}
                  style={{ color: '#6be' }}
                />
              ) : (
                <FavoriteBorderIcon onClick={handleAddToFavorite} />
              )}

              <img src={postData.image} alt={postData.title} />
            </div>
            <div>
              <h3>{postData.title}</h3>
              <p>{postData.subtitle}</p>
            </div>
            <div>
              <p>{postData.price}</p>
              <p>{postData.rating}</p>
            </div>
          </TextContent>
        </ContentWrapper>
      </PostWrapper>
    </StyledPost>
  );
};

export default PostLarge;
