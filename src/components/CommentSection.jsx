import React, { useState } from "react";
import axios from "axios";

const CommentSection = ({ comments, reviewId }) => {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);
  const [editMode, setEditMode] = useState(null); // 수정 모드 상태
  const [editedComment, setEditedComment] = useState("");

  const addComment = () => {
    const comment = {
      id: Date.now(),
      author: "you",
      content: newComment,
    };
    const updatedComments = [...commentList, comment];

    setCommentList(updatedComments);
    setNewComment("");

    axios.patch(`http://localhost:3001/reviews/${reviewId}`, {
      comments: updatedComments,
    });
  };

  const deleteComment = (id) => {
    const updatedComments = commentList.filter((comment) => comment.id !== id);
    setCommentList(updatedComments);

    axios.patch(`http://localhost:3001/reviews/${reviewId}`, {
      comments: updatedComments,
    });
  };

  const updateComment = (id) => {
    const updatedComments = commentList.map((comment) =>
      comment.id === id ? { ...comment, content: editedComment } : comment
    );
    setCommentList(updatedComments);
    setEditMode(null);
    setEditedComment("");

    axios.patch(`http://localhost:3001/reviews/${reviewId}`, {
      comments: updatedComments,
    });
  };

  return (
    <div className="mt-4">
      <h3 className="text-2xl mb-2">댓글</h3>
      {commentList.map((comment) => (
        <div key={comment.id} className="border-b-[1px] p-2 mb-2 rounded">
          {editMode === comment.id ? (
            <div className="flex justify-start items-baseline">
              <input
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="border p-2 rounded  mb-2 focus:outline-none w-[75%] mr-4"
              />
              <button
                onClick={() => updateComment(comment.id)}
                className="p-2 bg-red-500 text-white rounded mr-2"
              >
                수정완료
              </button>
              <button
                onClick={() => setEditMode(null)}
                className="p-2 bg-gray-500 text-white rounded"
              >
                취소
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>
                <strong>{comment.author}:</strong> {comment.content}
              </p>
              {comment.author === "you" && (
                <div>
                  <button
                    onClick={() => {
                      setEditMode(comment.id);
                      setEditedComment(comment.content);
                    }}
                    className="p-1 bg-gray-500 text-white rounded mr-2"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="p-1 bg-red-500 text-white rounded"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 입력해주세요."
        className="border p-2 rounded w-[85%] mb-2 mt-4 focus:outline-none"
      />
      <button
        onClick={addComment}
        disabled={!newComment.trim()}
        className={`p-2 border-[1.5px] ${
          !newComment.trim()
            ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-sky-200 border-sky-300 text-sky-500"
        } rounded ml-4`}
      >
        댓글쓰기
      </button>
    </div>
  );
};

export default CommentSection;
