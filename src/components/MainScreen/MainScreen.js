import React from "react";
import { Link } from "react-router-dom";
import "./MainScreen.css";

const MainScreen = () => {
  const posts = [
    { id: 1, title: "첫번째 게시글", content: "첫 번째 게시글 내용입니다." },
    { id: 2, title: "두번째 게시글", content: "두 번째 게시글 내용입니다." },
    { id: 3, title: "세번째 게시글", content: "세 번째 게시글 내용입니다." },
  ];

  return (
    <div className="post-container">
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Link to={`/post/${post.id}`}>더보기</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
