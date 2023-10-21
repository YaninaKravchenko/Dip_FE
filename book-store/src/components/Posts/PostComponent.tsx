import React, { useEffect, useState } from 'react';
import { PostBook, ApiResponse } from '../../types';
import PostLarge from './PostLarge';
import Title from '../Title/Title';
import { StyledPostsComponent, StyledPosts } from './styles';
import PaginationPosts from '../Pagination/Pagination';
import { fetchPostData } from '../../client/api/postsApi';
import { RootState } from '../../Store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PostComponent = () => {
  const [posts, setPosts] = useState<ApiResponse | null>({
    error: '',
    total: '',
    books: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

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

  const handlePageChange = (event: any, pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalAsNumber = posts && posts.total ? parseInt(posts.total, 10) : 0;
  return (
    <StyledPostsComponent>
      <Title variant='h1'>New Releases Books</Title>

      {filteredPosts && postsToDisplay && postsToDisplay.length > 0 ? (
        <StyledPosts>
          {postsToDisplay.map((book, index) => (
            <div key={index}>
              <h3>{book.title}</h3>
              <p>{book.subtitle}</p>
              <img src={book.image} alt={book.title} />
              <Link to={`/book/${book.isbn13}`}>Подробнее</Link>
            </div>
          ))}
        </StyledPosts>
      ) : (
        <StyledPosts>
          {currentPosts && currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <div key={index}>
                <PostLarge postData={post} index={index} />
                <Link to={`/book/${post.isbn13}`}>Подробнее</Link>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </StyledPosts>
      )}

      <PaginationPosts
        count={Math.ceil(
          posts && posts.total ? totalAsNumber / postsPerPage : 0
        )}
        page={currentPage}
        onBtnClick={handlePageChange}
      />
    </StyledPostsComponent>
  );
};

export default PostComponent;
