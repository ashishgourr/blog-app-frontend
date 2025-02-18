import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UpdatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the existing post data when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => {
        setError("Failed to fetch post details.");
      });
  }, [id]);

  // Handle the update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous errors

    if (title.trim() === "" || content.trim() === "") {
      setError("Both fields are required.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (error) {
      setError("Failed to update post. Please try again.");
    }
  };

  return (
    <div className="add-post-container">
      <h1 className="title">Edit Blog Post</h1>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
