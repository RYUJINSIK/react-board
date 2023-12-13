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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleImgDefault = (e) => {
    e.target.src = "/example.png";
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <button
              id="dropdownButton"
              className="px-4 py-2 bg-white text-gray-700 rounded-md shadow"
              aria-haspopup="true"
              aria-expanded="false"
            >
              최신순 ▼
            </button>
            <div
              id="dropdown"
              className="hidden absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul
                className="py-1 text-sm text-gray-700"
                aria-labelledby="dropdownButton"
              >
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    최신순
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    오래된 순
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow">
            게시글 작성
          </button>
        </div>

        {/* <!-- Posts List --> */}
        {list.length === 0
          ? null
          : list.map((list) => (
              <div className="space-y-4 pb-3">
                <Link to={`/post/${list.id}`}>
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                    <img
                      className="w-32 h-32 object-cover rounded"
                      src={`/${list.file}`}
                      alt={list.title}
                      onError={handleImgDefault}
                    />

                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold">{list.title}</h2>
                      <p className="text-gray-600">{list.content}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>
      {/* <!-- Pagination --> */}
      <div className="flex justify-center items-center space-x-2 pb-5">
        <button className="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          ◀
        </button>
        <button className="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          1
        </button>
        <button className="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          2
        </button>
        <button className="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          3
        </button>
        <button className="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          4
        </button>
        <button className="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          5
        </button>
        {/* <!-- End of page number block --> */}
        <button className="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          ▶
        </button>
      </div>
    </div>
  );
};

export default MainScreen;
