import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../actions/actions";

const PageButtons = ({ totalPages, currentPage }) => {
  const pageGroup = []; // 페이지 그룹을 담을 배열

  console.log("total ? , current ? : ", totalPages, currentPage);

  let startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  let endPage = startPage + 4;

  if (endPage > totalPages) {
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageGroup.push(i);
  }

  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className="flex justify-center items-center space-x-2 pb-5">
      <button className="px-3 py-1 bg-white rounded-md shadow text-gray-700">
        ◀
      </button>
      {pageGroup.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded-md shadow ${
            page === currentPage
              ? "bg-black text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button className="px-3 py-1 bg-white rounded-md shadow text-gray-700">
        ▶
      </button>
    </div>
  );
};

export default PageButtons;
