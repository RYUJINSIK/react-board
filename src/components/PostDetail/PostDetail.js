import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        console.log("?", res.data);
        setPost(res.data);
      })
      .catch((error) => {
        console.log("!", error);
      });
  }, []);

  return (
    post.length === 0 && (
      <div>
        <h1>{post[0].title}</h1>
        <h3>{post[0].content}</h3>
      </div>
    )
  );
};

export default PostDetail;
