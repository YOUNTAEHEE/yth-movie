import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CreateReviewPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(), 
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
    <div className="relative max-w-2xl mx-auto">
      <h1 className="mb-4 text-3xl font-bold">새 리뷰 작성</h1>
      <form onSubmit={handleSubmit} className="relative">
        <div className="mb-4">
          <label className="block mb-2 text-gray-700" htmlFor="title">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700" htmlFor="content">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="6"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700" htmlFor="category">
            카테고리
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700" htmlFor="author">
            작성자
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="absolute top-[-45px] right-0 p-2 text-white rounded bg-sky-300"
        >
          제출
        </button>
      </form>
      <Link to="/" className="block mt-4 text-center">
        <button className="bg-gray-300 text-gray-500 p-2 rounded w-[80px]">목록</button>
      </Link>
    </div>
  );
};

export default CreateReviewPage;
