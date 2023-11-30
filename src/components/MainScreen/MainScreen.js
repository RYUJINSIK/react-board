import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainScreen.css";
import axios from "axios";

const MainScreen = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("/select")
      .then((res) => {
        console.log(res);
        setList(res.data);
        console.log(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="post-container">
      <div className="post-list">
        {list.length === 0
          ? null
          : list.map((list) => (
              <div key={list.id} className="post-item">
                <h3>{list.title}</h3>
                <p>{list.content}</p>
                <Link to={`/post/${list.id}`}>더보기</Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MainScreen;
