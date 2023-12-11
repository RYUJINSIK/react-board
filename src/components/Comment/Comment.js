import React, { useState } from "react";

const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !commentText) {
      // 유효성 검사: 빈 칸일 경우
      alert("닉네임과 댓글을 입력해주세요.");
      return;
    }

    const newComment = {
      username: username,
      text: commentText,
    };

    setComments([...comments, newComment]);
    setUsername("");
    setCommentText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="닉네임"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={commentText}
          onChange={handleCommentTextChange}
        />
        <button type="submit">댓글 달기</button>
      </form>
      <div>
        <h3>댓글 목록</h3>
        {comments.length === 0 ? (
          <p>댓글이 없습니다.</p>
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.username}</strong>: {comment.text}
              </li>
            ))}
          </ul>
        )}
      </div>
      {props.postId}
    </div>
  );
};

export default Comment;
