import { createStore } from "redux";

export const setPage = (pageNumber) => {
  return {
    pageNumber: pageNumber,
  };
};

const initialState = {
  pageNumber: 1, // 기본 페이지 설정
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    // 다른 액션 처리...
    default:
      return state;
  }
};

const store = createStore(pageReducer);

export default store;
