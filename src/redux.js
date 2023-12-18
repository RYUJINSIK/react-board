import { createStore } from "redux";

export const setPage = (pageNumber) => {
  return {
    type: "SET_PAGE",
    pageNumber: pageNumber,
  };
};

const initialState = {
  currentPage: 1, // 기본 페이지 설정
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.pageNumber,
      };
    default:
      return state;
  }
};

const store = createStore(pageReducer);

export default store;
