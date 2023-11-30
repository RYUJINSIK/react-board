import React, { useState } from "react";
import "./Form.css";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    content: "",
  });

  const { username, title, content } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/write", null, {
        params: {
          username: username,
          title: title,
          content: content,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("글 작성이 완료되었습니다.");
        document.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
      });

    setFormData({
      username: "",
      title: "",
      content: "",
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
