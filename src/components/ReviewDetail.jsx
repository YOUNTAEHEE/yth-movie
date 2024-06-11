import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import CommentSection from "./CommentSection";

const ReviewDetail = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [rating, setRating] = useState(0);
  const [newLikes, setNewLikes] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/reviews/${id}`)
      .then((response) => {
        setReview(response.data);
        setRating(response.data.rating);
        setNewLikes(response.data.likes);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleLike = () => {
    if (likeStatus) return; // 이미 좋아요를 누른 경우, 아무 작업도 하지 않음
    setNewLikes(newLikes + 1);
    setLikeStatus(true);
  };

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    // 새로운 평점을 리뷰의 평점 배열에 추가합니다.
    const updatedRatings = [...review.ratings, rating];
    // 새로운 평균 평점을 계산합니다.
    const averageRating = (
      updatedRatings.reduce((acc, curr) => acc + curr, 0) / updatedRatings.length
    ).toFixed(1);

    axios
      .patch(`http://localhost:3001/reviews/${id}`, {
        likes: newLikes,
        ratings: updatedRatings,
        averageRating: parseFloat(averageRating),
      })
      .then((response) => setReview(response.data))
      .catch((error) => console.error("Error updating data:", error));
  };

  if (!review) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{review.title}</h1>
      <p className="text-gray-700 mb-4">{review.content}</p>
      <p className="text-gray-500 mb-4">작성자: {review.author}</p>
      <div className="flex items-center mb-4">
        <span className="mr-2">좋아요 : {newLikes}</span>
        <button
          onClick={handleLike}
          disabled={likeStatus}
          className={`p-2 rounded ${
            likeStatus ? "bg-gray-200 text-gray-400" : "bg-pink-400 text-white"
          }`}
        >
          Like
        </button>
      </div>
      <div className="mb-4 flex items-center">
        <span className="mr-2">평점 :</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            className={`p-1 ${
              rating >= star ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            ★
          </button>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-pink-400 text-white p-2 ml-4 rounded"
        >
          등록
        </button>
      </div>
      <div className="mb-4">
        <span className="mr-2">최종 평점 : {review.averageRating.toFixed(1)}</span>
      </div>
      <CommentSection comments={review.comments} reviewId={id} />
      <Link to="/" className="block mt-4 text-center">
        <button className="bg-gray-300 text-gray-500 p-2 rounded w-[80px]">목록</button>
      </Link>
    </div>
  );
};

export default ReviewDetail;
