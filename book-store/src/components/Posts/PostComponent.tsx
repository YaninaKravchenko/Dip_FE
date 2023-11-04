import React, { useEffect, useState } from 'react';
import { PostBook, ApiResponse } from '../../types';
import PostLarge from './PostLarge';
import Title from '../Title/Title';
import {
  StyledPostsComponent,
  StyledPosts,
  StyledAboutBookBtn,
  StyledArrowPaginationPosts,
  StyledArrowForwardIcon,
  StyledArrowBackIcon,
  StyledPostFavoriteIcon,
  StyledPostFavoriteBorderIcon,
  StyledPostsWithBtn,
  StyledTitleSubtitle,
  StyledLargePostPrice,
  ContentBackgroundBorder,
  StyledSearchPStarRating,
  StyledSearchAboutBookBtn,
  ContentWrapper,
  TextContent,
  StyledPostSearchFavoriteIcon,
  StyledPostSearchFavoriteBorderIcon,
} from './styles';
import PaginationPosts from '../Pagination/Pagination';
import { fetchPostData } from '../../client/api/postsApi';
import { RootState } from '../../Store';
import { useSelector, useDispatch } from 'react-redux';
import { myFavoritesActions } from '../../Store/Actions/myFavoritesActions';
import { StyledLink } from './PostFavorites/styles';
import { cartActions } from '../../Store/Actions/cartActions';
import Button from '../Button/Button';
import IconArrowBack from '../IconArrowBack/IconArrowBack';
import StarRating from '../StarRating/StarRating';
import { useNavigate } from 'react-router-dom';

const PostComponent = () => {
  const [posts, setPosts] = useState<ApiResponse | null>({
    error: '',
    total: '',
    books: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const dispatch = useDispatch();

  const filteredPosts: ApiResponse = useSelector(
    (state: RootState) => (state as any).search.filteredPosts
  );

  // const searchText: string = useSelector(
  //   (state: RootState) => (state as any).search.searchText
  // );
  // console.log(searchText);

  const postsToDisplay: PostBook[] = filteredPosts.books;

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetchPostData();
      setPosts(postData);
    };

    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    posts && posts.books
      ? posts.books.slice(indexOfFirstPost, indexOfLastPost)
      : [];

  const indexOfLastPostSearch = currentPage * postsPerPage;
  const indexOfFirstPostSearch = indexOfLastPostSearch - postsPerPage;
  const currentSearchPosts = postsToDisplay.slice(
    indexOfFirstPostSearch,
    indexOfLastPostSearch
  );

  const handlePageChange = (event: any, pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalAsNumber = posts && posts.total ? parseInt(posts.total, 10) : 0;

  const displayTitle =
    filteredPosts && postsToDisplay && postsToDisplay.length > 0
      ? 'Search Results'
      : 'New Releases Books';

  const favoriteBooks = useSelector(
    (state: RootState) => state.favorites.favorite
  );
  const handleToggleFavorite = (book: PostBook) => {
    const isFavorite = favoriteBooks.some(
      (favBook: PostBook) => favBook.isbn13 === book.isbn13
    );

    if (isFavorite) {
      dispatch(myFavoritesActions.removeFromFavorite(book.isbn13));
    } else {
      dispatch(myFavoritesActions.addToFavorite(book));
    }
  };

  const handleAddToCart = (book: PostBook) => {
    dispatch(cartActions.addToCart(book));
  };

  const handleAddToCartNewBook = (post: PostBook) => {
    dispatch(cartActions.addToCart(post));
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalAsNumber / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const totalPagesSearch = Math.ceil(postsToDisplay.length / postsPerPage);
  const totalPages =
    postsToDisplay && postsToDisplay.length > 0
      ? totalPagesSearch
      : Math.ceil(totalAsNumber / postsPerPage);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(0);
  };

  return (
    <StyledPostsComponent>
      <div>
        {displayTitle === 'Search Results' && (
          <IconArrowBack onClick={handleBack} />
        )}
        <Title variant='h1'>{displayTitle}</Title>
      </div>

      {filteredPosts && postsToDisplay && postsToDisplay.length > 0 ? (
        <StyledPosts>
          {currentSearchPosts.map((book, index) => (
            <StyledPostsWithBtn key={index}>
              <ContentBackgroundBorder>
                {favoriteBooks.some(
                  (favBook: PostBook) => favBook.isbn13 === book.isbn13
                ) ? (
                  <StyledPostSearchFavoriteIcon
                    onClick={() => handleToggleFavorite(book)}
                  />
                ) : (
                  <StyledPostSearchFavoriteBorderIcon
                    onClick={() => handleToggleFavorite(book)}
                  />
                )}
                <img src={book.image} alt={book.title} />
              </ContentBackgroundBorder>
              <StyledTitleSubtitle>
                <h3>{book.title}</h3>
              </StyledTitleSubtitle>
              <StyledSearchPStarRating>
                <p>{book.price}</p>
                <StarRating rating={book.rating} />
              </StyledSearchPStarRating>

              <StyledSearchAboutBookBtn>
                <Button onClick={() => handleAddToCart(book)}>Buy</Button>
                <StyledLink to={`/book/${book.isbn13}`}>About Book</StyledLink>
              </StyledSearchAboutBookBtn>
            </StyledPostsWithBtn>
          ))}
        </StyledPosts>
      ) : (
        <StyledPosts>
          {currentPosts && currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <div key={index}>
                <PostLarge postData={post} index={index} />
                <StyledAboutBookBtn>
                  <StyledLink to={`/book/${post.isbn13}`}>
                    About Book
                  </StyledLink>
                  <Button onClick={() => handleAddToCartNewBook(post)}>
                    Buy
                  </Button>
                </StyledAboutBookBtn>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </StyledPosts>
      )}

      <StyledArrowPaginationPosts>
        <StyledArrowBackIcon
          currentPage={currentPage}
          onClick={handlePrevPage}
        />
        <PaginationPosts
          count={
            postsToDisplay && postsToDisplay.length > 0
              ? totalPagesSearch
              : Math.ceil(totalAsNumber / postsPerPage)
          }
          page={currentPage}
          onBtnClick={handlePageChange}
        />
        <StyledArrowForwardIcon
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handleNextPage}
        />
      </StyledArrowPaginationPosts>
    </StyledPostsComponent>
  );
};

export default PostComponent;
