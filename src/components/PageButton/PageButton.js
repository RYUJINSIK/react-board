import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../actions/actions";

const PageButtons = ({ totalPages, currentPage }) => {
  const pageGroup = []; // 페이지 그룹을 담을 배열

  console.log("total ? , current ? : ", totalPages, currentPage);

  // 현재 페이지 그룹의 첫 번째 페이지 계산
  let startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  let endPage = startPage + 4;

  // 총 페이지가 5개 미만인 경우
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  // 현재 페이지 그룹에 따른 페이지 번호를 배열에 추가
  for (let i = startPage; i <= endPage; i++) {
    pageGroup.push(i);
  }

  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
    // 페이지 변경 후 추가 작업 수행
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
