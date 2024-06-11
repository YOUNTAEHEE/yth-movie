import React from "react";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => (
  <div className="border p-4 rounded ">
    <h3 className="text-xl font-bold">{review.title}</h3>
    <p className="text-gray-600 mt-2">{review.content}</p>
    <Link to={`/review/${review.id}`} className="text-sky-400 mt-4 block text-right">
      더보기
    </Link>
  </div>
);

export default ReviewCard;
