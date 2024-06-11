import React from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from './ReviewCard';

const ReviewList = ({ reviews, viewType }) => {
  if (!reviews || reviews.length === 0) {
    return <div>리뷰가 없습니다.</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map(review => (
        viewType === 'list' ? (
          <div key={review.id} className="border p-4 rounded">
            <Link to={`/review/${review.id}`} className="text-gray-900">{review.title}</Link>
          </div>
        ) : (
          <ReviewCard key={review.id} review={review} />
        )
      ))}
    </div>
  );
};

export default ReviewList;
