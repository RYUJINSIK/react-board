import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainScreen.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../actions/actions";
import PageButton from "../../components/PageButton/PageButton";

const MainScreen = () => {
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState("최신순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pageNumber = useSelector((state) => state.pageNumber);

  useEffect(() => {
    axios
      .get("/select", {
        params: {
          sort: selectedItem,
        },
      })
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedItem]);

  useEffect(() => {
    // 페이징 했을 때 게시글 목록 research
  }, [pageNumber]);

  const handleImgDefault = (e) => {
    e.target.src = "/example.png";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                {selectedItem} ▼
              </button>
            </div>

            {isDropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="py-1" role="none">
                  <p
                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                    onClick={() => handleItemClick("최신순")}
                    role="menuitem"
                  >
                    최신순
                  </p>
                  <p
                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                    onClick={() => handleItemClick("오래된순")}
                    role="menuitem"
                  >
                    오래된순
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to={`/form`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow">
              게시글 작성
            </button>
          </Link>
        </div>

        {/* <!-- Posts List --> */}
        {list.length === 0
          ? null
          : list.slice(0, 5).map((list) => (
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
      <PageButton totalPages={list.length / 5 + 1} currentPage={pageNumber} />
    </div>
  );
};

export default MainScreen;
