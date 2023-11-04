import React from 'react';
import { ContentWrapper, PostWrapper, TextContent, StyledPost } from './styles';
import { PostBook } from '../../types';
import { useDispatch } from 'react-redux';
import { myFavoritesActions } from '../../Store/Actions/myFavoritesActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import {
  StyledPostFavoriteIcon,
  StyledPostFavoriteBorderIcon,
  ContentBackgroundColor,
  StyledTitleSubtitle,
  StyledLargePostPrice,
} from './styles';

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
    (post: PostBook) => post.isbn13 === postData.isbn13
  );

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
            <ContentBackgroundColor index={index}>
              {postIsFavorite ? (
                <StyledPostFavoriteIcon onClick={handleAddToFavorite} />
              ) : (
                <StyledPostFavoriteBorderIcon onClick={handleAddToFavorite} />
              )}

              <img src={postData.image} alt={postData.title} />
            </ContentBackgroundColor>
            <StyledTitleSubtitle>
              <h3>{postData.title}</h3>
              <p>{postData.subtitle}</p>
            </StyledTitleSubtitle>
            <div>
              <StyledLargePostPrice>
                <p>{postData.price}</p>
              </StyledLargePostPrice>
            </div>
          </TextContent>
        </ContentWrapper>
      </PostWrapper>
    </StyledPost>
  );
};

export default PostLarge;
