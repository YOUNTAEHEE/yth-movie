import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateReviewPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(), // ID를 임시로 설정합니다.
      title,
      content,
      category,
      author,
      likes: 0,
      rating: 0,
      comments: [],
      ratings: [],
      averageRating: 0,
    };

    axios
      .post("http://localhost:3001/reviews", newReview)
      .then((response) => {
        console.log("Review created:", response.data);
        navigate("/");
      })
      .catch((error) => console.error("Error creating review:", error));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">새 리뷰 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded w-full"
            rows="6"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            카테고리
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="author">
            작성자
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          제출
        </button>
      </form>
    </div>
  );
};

export default CreateReviewPage;
