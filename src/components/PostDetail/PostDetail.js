import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from "../../components/Comment/Comment";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get("/read", {
        params: {
          postId: parseInt(postId),
        },
      })
      .then((res) => {
        console.log("??", res);
        setPost(res.data);
      })
      .catch((error) => {
        console.log("!", error);
      });
  }, []);

  const handleImageDownload = () => {
    axios({
      url: `/${post[0].file}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "filename.jpg"); // 파일명 설정
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  };

  const handleImgDefault = (e) => {
    e.target.src = "/example.png";
  };

  return (
    post.length !== 0 && (
      <>
        <body class="bg-gray-50 pt-5">
          <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
            <h1 class="text-2xl font-bold mb-2">{post[0].title}</h1>
            <div class="text-gray-600 text-sm mb-4 ">
              {post[0].writer} | {post[0].created_date.slice(0, 10)}
            </div>
            {post[0].file && ( // post[0].file 값이 존재할 때에만 img 태그 렌더링
              <img
                className="mb-4 rounded"
                src={`/${post[0].file}`}
                alt="이미지"
                onClick={handleImageDownload}
                onError={handleImgDefault}
              />
            )}
            <div class="text-gray-800 ">
              <p>{post[0].content}</p>
            </div>
          </div>
          <Comment postId={postId} />
        </body>
      </>
    )
  );
};

export default PostDetail;
