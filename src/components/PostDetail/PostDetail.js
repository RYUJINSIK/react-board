import React from "react";

const PostDetail = (props) => {
  const postId = props.postId;
  console.log("postId : " + postId);

  // postId를 이용하여 해당 게시글 정보를 가져오는 로직이 있어야 합니다.
  // 아래는 예시로 간단히 postId를 출력하는 코드입니다.

  return (
    <div>
      <h2>게시글 상세 페이지 - {postId}</h2>
      {/* 상세 정보 표시 */}
    </div>
  );
};

export default PostDetail;
