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

  return (
    post.length !== 0 && (
      <>
        <div>
          <h1>{post[0].title}</h1>
          <h3>{post[0].content}</h3>
          <img
            src={`/${post[0].file}`}
            alt="이미지"
            onClick={handleImageDownload}
          ></img>
        </div>
        <Comment postId={postId} />
      </>
    )
  );
};

export default PostDetail;
