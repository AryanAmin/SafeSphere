import React, { useState } from "react";
import "./postDetails.css";
import { useParams } from "react-router";

const PostDetails = () => {
  const postCid = useParams().id;
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  // Simulating fetching comments for the post
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      // Simulating an API call to fetch comments
      const response = await fetch(`/api/comments?postId=${postCid}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostListener = (e) => {
    console.log("Cid: ", postCid);
    fetchComments();
  };

  return (
    <div className="post-details">
      <h2>CID: {postCid}</h2>
      {/* <div className="post" onClick={handlePostListener}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <div className="author">Posted by {post.author}</div>
      </div>
      {isLoading ? (
        <div>Loading comments...</div>
      ) : (
        <div className="comments">
          <h3>Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <p>{comment.body}</p>
                <div className="comment-author">
                  Comment by {comment.author}
                </div>
              </div>
            ))
          ) : (
            <div>No comments found.</div>
          )}
        </div> */}
      {/* )} */}
    </div>
  );
};

export default PostDetails;
