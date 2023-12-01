import React, { useState } from "react";
import "./Form.css";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    content: "",
    file: null, // 추가: 파일 상태 추가
  });

  const { username, title, content, file } = formData;

  const handleInputChange = (event) => {
    if (event.target.name === "filename") {
      setFormData({ ...formData, file: event.target.files[0] });
    } else {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append("username", username);
    postData.append("title", title);
    postData.append("content", content);
    postData.append("file", file); // 파일 추가

    try {
      const response = await axios.post("/write", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      alert("글 작성이 완료되었습니다.");
      document.location.href = "/";
    } catch (error) {
      console.error(error);
    }

    setFormData({
      username: "",
      title: "",
      content: "",
      file: null,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>사용자:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>제목:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>내용:</label>
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>첨부파일:</label>
          <input
            type="file"
            name="filename"
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
