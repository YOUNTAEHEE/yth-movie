import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewList from "../components/ReviewList";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [viewType, setViewType] = useState("list"); // 'list' or 'card'
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState(""); // 'likes' or 'rating'

  useEffect(() => {
    axios
      .get("http://localhost:3001/reviews")
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOption === "likes") {
      return b.likes - a.likes;
    } else if (sortOption === "rating") {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="검색하기"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded focus:outline-none w-[30%]"
        />
        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="focus:outline-none border p-2  mr-2"
          >
            <option value="">정렬 선택</option>
            <option value="likes">좋아요 순</option>
            <option value="rating">평점 순</option>
          </select>
          <button
            onClick={() => setViewType("list")}
            className="mr-2 p-2 bg-sky-300 text-white rounded "
          >
            List View
          </button>
          <button
            onClick={() => setViewType("card")}
            className="p-2 bg-sky-300 text-white rounded"
          >
            Card View
          </button>
          <Link to="/create-review">
            <button className="p-2 bg-green-500 text-white rounded ml-2">
              글 작성하기
            </button>
          </Link>
        </div>
      </div>
      <ReviewList reviews={sortedReviews} viewType={viewType} />
    </div>
  );
};

export default HomePage;
