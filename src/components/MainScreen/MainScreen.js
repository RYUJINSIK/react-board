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

  // Simple dropdown functionality
  document
    .getElementById("dropdownButton")
    .addEventListener("click", function () {
      var dropdown = document.getElementById("dropdown");
      dropdown.classList.toggle("hidden");
    });

  return (
    // <div className="post-container">
    //   <div className="post-list">
    //     {list.length === 0
    //       ? null
    //       : list.map((list) => (
    //           <div key={list.id} className="post-item">
    //             <img
    //               src={`/${list.file}`}
    //               alt={list.title}
    //               onError={handleImgDefault}
    //               className="thumbnail"
    //             />
    //             <h3>{list.title}</h3>
    //             <p>{list.content}</p>
    //             <Link to={`/post/${list.id}`}>더보기</Link>
    //           </div>
    //         ))}
    //   </div>
    // </div>

    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <div class="relative">
          <button
            id="dropdownButton"
            class="px-4 py-2 bg-white text-gray-700 rounded-md shadow"
            aria-haspopup="true"
            aria-expanded="false"
          >
            최신순 ▼
          </button>
          <div
            id="dropdown"
            class="hidden absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          >
            <ul
              class="py-1 text-sm text-gray-700"
              aria-labelledby="dropdownButton"
            >
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                  최신순
                </a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                  오래된 순
                </a>
              </li>
            </ul>
          </div>
        </div>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-md shadow">
          게시글 작성
        </button>
      </div>

      {/* <!-- Posts List --> */}
      <div class="space-y-4">
        {/* <!-- Repeat this block for each post (5 posts per page) --> */}
        <div class="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
          <img
            class="w-32 h-32 object-cover rounded"
            src="https://via.placeholder.com/128"
            alt="Thumbnail"
          />
          <div class="flex flex-col">
            <h2 class="text-xl font-semibold">Post Title</h2>
            <p class="text-gray-600">
              This is the content of the post. It should be arranged
              horizontally with the thumbnail image and post title.
            </p>
          </div>
        </div>
        {/* <!-- End of post block --> */}
      </div>

      {/* <!-- Pagination --> */}
      <div class="flex justify-center items-center space-x-2 mt-8">
        <button class="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          ◀
        </button>
        {/* <!-- Repeat this block for each page number (assuming 5 pages) --> */}
        <button class="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          1
        </button>
        <button class="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          2
        </button>
        <button class="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          3
        </button>
        <button class="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          4
        </button>
        <button class="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          5
        </button>
        {/* <!-- End of page number block --> */}
        <button class="px-3 py-1 bg-white rounded-md shadow text-gray-700">
          ▶
        </button>
      </div>
    </div>
  );
};

export default MainScreen;
