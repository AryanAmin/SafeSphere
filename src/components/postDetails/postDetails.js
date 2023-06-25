import React from "react";
import "./postDetails.css";

function PostDetails() {
  const post = {
    title: "Example Post Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    walletAddress: "0x123456789",
    timestamp: "June 24, 2023",
    totalVotes: 10,
    comments: [
      { id: 1, text: "Comment 1" },
      { id: 2, text: "Comment 2" },
    ],
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="post-details-container">
      <button className="back-button" onClick={handleGoBack}>
        Back
      </button>
      <div className="post-content">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-description">{post.description}</p>
        <div className="post-info">
          <div className="info-item">
            <strong>Wallet Address:</strong> {post.walletAddress}
          </div>
          <div className="info-item">
            <strong>Timestamp:</strong> {post.timestamp}
          </div>
          <div className="info-item">
            <strong>Total Votes:</strong> {post.totalVotes}
          </div>
        </div>
      </div>
      <h2 className="comments-heading">Comments</h2>
      <ul className="comments-list">
        {post.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetails;
