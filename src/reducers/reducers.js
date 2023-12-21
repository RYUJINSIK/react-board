// reducers.js
const initialState = {
  pageNumber: 1, // 기본 페이지 설정
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        pageNumber: action.pageNumber,
      };
    default:
      return state;
  }
};
