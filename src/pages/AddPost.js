import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { parseJwt } from "../utils/Utils";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset previous errors
    setError(null);

    if (title.trim() === "" || content.trim() === "") {
      setError("Both fields are required.");
      return;
    }

    try {
      // Assuming userId can be retrieved from the token
      const decodedToken = token ? parseJwt(token) : null;
      const userId = decodedToken && decodedToken.id ? decodedToken.id : null;

      console.log("User ID:", userId); // Log the userId

      if (!userId) {
        setError("User not authenticated.");
        return;
      }

      console.log("Latest token:", token);
      await axios.post(
        "http://localhost:5000/api/posts",
        { title, content, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed to add post. Please try again.");
    }
  };

  return (
    <div className="add-post-container">
      <h1 className="title">Create a New Blog Post</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />

        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
          required
          draggable={false}
        />

        <button type="submit" className="submit-button">
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddPost;
