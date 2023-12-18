// reducers.js
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
