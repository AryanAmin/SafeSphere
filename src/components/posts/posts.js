import React, { useState } from "react";
import "./posts.css";

const Posts = ({ posts, onPostClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePostListener = (e, cid) => {
    console.log("Cid: ", cid);
  }

  return (
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.cid} onClick={(e) => {onPostClick(e, post.cid)}}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <div className="author">
            Posted by {post.author}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;