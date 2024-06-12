import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [rating, setRating] = useState(0);
  const [newLikes, setNewLikes] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const loggedInUser = "you"; // This should be replaced with actual logged-in user info

  useEffect(() => {
    axios
      .get(`http://localhost:3001/reviews/${id}`)
      .then((response) => {
        setReview(response.data);
        setRating(response.data.rating);
        setNewLikes(response.data.likes);
        setEditTitle(response.data.title);
        setEditContent(response.data.content);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleLike = () => {
    if (likeStatus) return;
    const updatedLikes = newLikes + 1;
    setNewLikes(updatedLikes);
    setLikeStatus(true);

    axios
      .patch(`http://localhost:3001/reviews/${id}`, { likes: updatedLikes })
      .then((response) => setReview(response.data))
      .catch((error) => console.error("Error updating likes:", error));
  };

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    const updatedRatings = [...review.ratings, rating];
    const averageRating = (
      updatedRatings.reduce((acc, curr) => acc + curr, 0) /
      updatedRatings.length
    ).toFixed(1);

    axios
      .patch(`http://localhost:3001/reviews/${id}`, {
        ratings: updatedRatings,
        averageRating: parseFloat(averageRating),
      })
      .then((response) => {
        setReview(response.data);
        setRatingSubmitted(true);
      })
      .catch((error) => console.error("Error updating rating:", error));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/reviews/${id}`)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error deleting review:", error));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = () => {
    axios
      .patch(`http://localhost:3001/reviews/${id}`, {
        title: editTitle,
        content: editContent,
      })
      .then((response) => {
        setReview(response.data);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating review:", error));
  };

  if (!review) return <div>Loading...</div>;

  return (
    <div className="relative max-w-2xl mx-auto">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            onClick={handleEditSubmit}
            className="p-2 text-white bg-red-400 rounded"
          >
            저장
          </button>
          <button
            onClick={handleEditToggle}
            className="p-2 ml-2 text-white bg-gray-400 rounded"
          >
            취소
          </button>
        </div>
      ) : (
        <div>
          <h1 className="mb-4 text-3xl font-bold">{review.title}</h1>
          <p className="mb-4 text-gray-700">{review.content}</p>
          <p className="mb-4 text-gray-500">작성자: {review.author}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2">좋아요 : {newLikes}</span>
            <button
              onClick={handleLike}
              disabled={likeStatus}
              className={`p-2 rounded ${
                likeStatus
                  ? "bg-gray-200 text-gray-400"
                  : "bg-pink-400 text-white"
              }`}
            >
              Like
            </button>
          </div>
          <div className="flex items-center mb-4">
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
              disabled={ratingSubmitted}
              className={`p-2 ml-4  rounded ${
                ratingSubmitted
                  ? "bg-gray-200 text-gray-400"
                  : "bg-pink-400 text-white"
              }`}
            >
              등록
            </button>
          </div>
          <div className="mb-4">
            <span className="mr-2">
              최종 평점 : {review.averageRating.toFixed(1)}
            </span>
          </div>
          <CommentSection comments={review.comments} reviewId={id} />
          {review.author === loggedInUser && (
            <div className="absolute top-0 right-0 flex p-4 space-x-2">
              <button
                onClick={handleEditToggle}
                className="p-2 text-white bg-gray-300 rounded"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-white bg-red-400 rounded"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
      <Link to="/" className="block mt-4 text-center">
        <button className="bg-gray-300 text-gray-500 p-2 rounded w-[80px]">
          목록
        </button>
      </Link>
    </div>
  );
};

export default ReviewDetail;
