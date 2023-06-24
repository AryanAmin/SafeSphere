import React, { useState } from "react";
import './NewPost.css';

function NewPost() {
  // New post form state
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    files: [],
  });

  // Handle input change in the new post form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle new post submission
  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    if (newPost.content != null && newPost.title != null){
        console.log(newPost);
        // Clear the new post form
        setNewPost({
          title: "",
          content: "",
          files: [],
        });
    }
  };

  return (
    <div className="new-post-container">
      <h2>Add New Post</h2>
      <form className="new-post-form" onSubmit={handleNewPostSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={handleInputChange}
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default NewPost;
