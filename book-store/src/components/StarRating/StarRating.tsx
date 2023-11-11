import React from 'react';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
//import { BookResponse } from '../../types';

interface StarRatingProps {
  rating: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const numberRating = parseFloat(rating);

  const renderStars = (rating: number) => {
    console.log('Rating is: ', rating);
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<StarIcon key={i} color='primary' />);
      } else if (rating > i - 0.5 && rating < i) {
        stars.push(<StarHalfIcon key={i} color='primary' />);
      } else {
        stars.push(<StarBorderIcon key={i} color='action' />);
      }
    }
    return stars;
  };

  return <div>{renderStars(numberRating)}</div>;
};

export default StarRating;
