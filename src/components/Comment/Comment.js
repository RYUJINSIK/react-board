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
    <body className="bg-gray-50">
      <div className="max-w-2xl mx-auto py-3">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">댓글</h2>
          </div>

          {comment.length === 0 ? null : (
            <ul>
              {comment.map((comment, index) => (
                <div className="space-y-4 mb-3" key={index}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-800">
                        {comment.writer}
                      </div>

                      <div className="text-sm text-gray-500">
                        {comment.created_date.slice(0, 10)}
                      </div>
                    </div>
                    <p className="text-black">{comment.comment}</p>
                  </div>
                  <hr />
                </div>
              ))}
            </ul>
          )}
          <div className="mt-6">
            <div className="flex">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring focus:border-blue-300"
                placeholder="닉네임"
                aria-label="닉네임"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring focus:border-blue-300 ml-4"
                aria-label="댓글내용"
                placeholder="댓글을 입력하세요"
                value={commentText}
                onChange={handleCommentTextChange}
              />
              <button
                className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring"
                onClick={handleSubmit}
              >
                댓글달기
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Comment;
