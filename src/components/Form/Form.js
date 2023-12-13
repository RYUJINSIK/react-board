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
    console.log("postData ? : ", postData);

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
    <body className="bg-gray-100">
      <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
        <form className="space-y-6">
          <div>
            <label
              for="author"
              className="block text-sm font-medium text-gray-700"
            >
              작성자
            </label>
            <input
              type="text"
              id="author"
              name="username"
              className="mt-1 form-input block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="입력칸"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              for="title"
              className="block text-sm font-medium text-gray-700"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 form-input block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="입력칸"
              value={title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              for="content"
              className="block text-sm font-medium text-gray-700"
            >
              내용
            </label>
            <textarea
              id="content"
              name="content"
              rows="4"
              className="mt-1 form-input block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="입력칸"
              value={content}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div>
            <label
              for="thumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              썸네일
            </label>
            <input
              type="file"
              id="thumbnail"
              name="filename"
              className="mt-1 block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="파일첨부"
              onChange={handleInputChange}
              accept="image/*"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              제출
            </button>
          </div>
        </form>
      </div>
    </body>
  );
};

export default Form;
