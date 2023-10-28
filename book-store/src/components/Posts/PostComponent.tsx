import React, { useEffect, useState } from 'react';
import { PostBook, ApiResponse } from '../../types';
import PostLarge from './PostLarge';
import Title from '../Title/Title';
import {
  StyledPostsComponent,
  StyledPosts,
  StyledAboutBookBtn,
} from './styles';
import PaginationPosts from '../Pagination/Pagination';
import { fetchPostData } from '../../client/api/postsApi';
import { RootState } from '../../Store';
import { useSelector, useDispatch } from 'react-redux';
//import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { myFavoritesActions } from '../../Store/Actions/myFavoritesActions';
import { StyledLink } from './PostFavorites/styles';
import { cartActions } from '../../Store/Actions/cartActions';
import CartPage from '../Pages/CartPage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '../Button/Button';
import IconArrowBack from '../IconArrowBack/IconArrowBack';

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

  const searchText: string = useSelector(
    (state: RootState) => (state as any).search.searchText
  );
  console.log(searchText);

  const postsToDisplay: PostBook[] = filteredPosts.books;

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetchPostData();
      console.log(postData);
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

  return (
    <StyledPostsComponent>
      <div>
        {displayTitle === 'Search Results' && <IconArrowBack />}
        <Title variant='h1'>{displayTitle}</Title>
      </div>

      {filteredPosts && postsToDisplay && postsToDisplay.length > 0 ? (
        <StyledPosts>
          {currentSearchPosts.map((book, index) => (
            <div key={index}>
              <div>
                <h3>{book.title}</h3>
                {favoriteBooks.some(
                  (favBook: PostBook) => favBook.isbn13 === book.isbn13
                ) ? (
                  <FavoriteIcon
                    onClick={() => handleToggleFavorite(book)}
                    style={{ color: '#6be' }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={() => handleToggleFavorite(book)}
                  />
                )}
              </div>
              <img src={book.image} alt={book.title} />
              <div>
                <p>{book.subtitle}</p>
                <p>{book.year}</p>
                <p>{book.price}</p>
                <StyledAboutBookBtn>
                  <StyledLink to={`/book/${book.isbn13}`}>
                    About Book
                  </StyledLink>
                  <Button onClick={() => handleAddToCart(book)}>Buy</Button>
                </StyledAboutBookBtn>
              </div>
            </div>
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
      <CartPage />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ArrowBackIcon
          onClick={handlePrevPage}
          style={
            currentPage === 1
              ? { visibility: 'hidden', cursor: 'default' }
              : { cursor: 'pointer' }
          }
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
        <ArrowForwardIcon
          onClick={handleNextPage}
          style={
            currentPage === totalPages
              ? { visibility: 'hidden', cursor: 'default' }
              : { cursor: 'pointer' }
          }
        />
      </div>
    </StyledPostsComponent>
  );
};

export default PostComponent;
