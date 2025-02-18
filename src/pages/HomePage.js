import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const { token } = useContext(AuthContext);

  //Fetch Blog posts

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Delete Blog posts

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setPosts(posts.filter((post) => post._id !== id)))
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Blog Posts</h1>
        <Link to="/add" className="add-button">
          + Add New Post
        </Link>

        <Logout />
      </header>

      {posts.length === 0 ? (
        <div className="empty-state">
          <h2>No Posts Available</h2>
          <p>Start by adding a new post!</p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <div className="post-actions">
                <Link to={`/update/${post._id}`} className="update-button">
                  Update
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
