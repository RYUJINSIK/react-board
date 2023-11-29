import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import MainScreen from "./components/MainScreen/MainScreen";
import PostDetail from "./components/PostDetail/PostDetail";

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Router>
      <Navbar />
      <div className="header">
        <div className="left-content">
          <h1>{showForm ? "게시글 작성" : "게시글 목록"}</h1>
        </div>
        <div className="right-content">
          <button onClick={toggleForm} id="writeButton">
            {showForm ? "돌아가기" : "게시물 작성하기"}
          </button>
        </div>
      </div>

      {showForm ? (
        <Form />
      ) : (
        <Routes>
          <Route path="/" element={<MainScreen />}></Route>
          <Route path="/post/1" element={<PostDetail postId="1" />}></Route>
        </Routes>
      )}
    </Router>
  );
}

export default App;
