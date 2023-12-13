import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import MainScreen from "./components/MainScreen/MainScreen";
import PostDetail from "./components/PostDetail/PostDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />}></Route>
        <Route path="/post/:postId" element={<PostDetail />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
