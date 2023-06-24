import React, { useState } from "react";
import "./Home.css";
import Posts from "../posts/posts";
import PostDetails from "../postDetails/postDetails";
import { useNavigate } from "react-router";

const posts = [
  {
    title: "This is a post",
    body: "This is the body of the post",
    author: "John Doe",
    cid: 456
  },
  {
    title: "This is another post",
    body: "This is the body of another post",
    author: "Jane Doe",
    cid: 635
  },
];

function Home() {
  const history = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (e, postCid) => {
    e.preventDefault();
    history(`/post/${postCid}`)
  };

  return (
    <div className="home-container">
      <h1>Main Feed</h1>
        <Posts posts={posts} onPostClick={handlePostClick} />
    </div>
  );
}

export default Home;
