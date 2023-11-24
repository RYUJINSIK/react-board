import React, { useState } from "react";
import "./Form.css";

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
