import React, { useState, useEffect } from "react";
import axios from "axios";

const Comment = (props) => {
  const [comment, setComment] = useState([]);
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");
  const [reload, setReload] = useState(true);

  useEffect(() => {
    axios
      .get("/comment", {
        params: {
          postId: parseInt(props.postId),
        },
      })
      .then((res) => {
        setComment(res.data);
      })
      .catch((error) => {
        console.log("!", error);
      });
  }, [reload]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !commentText) {
      alert("닉네임과 댓글을 입력해주세요.");
      return;
    }

    const commentData = {
      postId: props.postId,
      username: username,
      comment: commentText,
    };

    axios
      .post("/commentWrite", commentData)
      .then((res) => {
        setReload(!reload);
        setUsername("");
        setCommentText("");
      })
      .catch((error) => {
        console.error("댓글 작성 실패:", error);
      });
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
        {comment.length === 0 ? null : (
          <ul>
            {comment.map((comment, index) => (
              <li key={index}>
                <strong>{comment.writer}</strong>: {comment.comment}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Comment;
