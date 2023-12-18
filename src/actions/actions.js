// actions.js
export const setPage = (pageNumber) => {
  console.log("pageNumber ? : ", pageNumber);

  return {
    type: "SET_PAGE",
    pageNumber: pageNumber,
  };
};
