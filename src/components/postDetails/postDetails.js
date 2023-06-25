import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";
import "./postDetails.css";

const PostDetails = () => {
  const { postId } = useParams();
  const db = getFirestore();
  const postRef = doc(db, "posts", postId);
  const commentsRef = collection(db, "comments");
  const [postDetails, setPostDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postSnapshot = await getDoc(postRef);
        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          setPostDetails(postData);
        } else {
          console.log("Post not found.");
          // Handle the case where the post doesn't exist
        }
      } catch (error) {
        console.log("Error fetching post details:", error);
        // Handle the error case
      }
    };

    const fetchComments = () => {
      const commentsQuery = query(
        commentsRef,
        where("postId", "==", postId),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        const fetchedComments = snapshot.docs.map((doc) => doc.data());
        setComments(fetchedComments);
      });

      return unsubscribe;
    };

    fetchPostDetails();
    const unsubscribeComments = fetchComments();

    return () => {
      unsubscribeComments();
    };
  }, [postRef, commentsRef, postId]);

  const handleVote = async (voteType) => {
    if (!postDetails) return;

    setIsLoading(true);

    const voteIncrement = voteType === "upvote" ? 1 : 1;

    try {
      await updateDoc(postRef, {
        totalVotes: postDetails.totalVotes + voteIncrement,
      });
    } catch (error) {
      console.log("Error updating vote count:", error);
      // Handle the error case
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!postDetails || !commentText) return;

    setIsLoading(true);

    try {
      await addDoc(commentsRef, {
        postId,
        text: commentText,
        timestamp: serverTimestamp(),
      });
      setCommentText("");
    } catch (error) {
      console.log("Error adding comment:", error);
      // Handle the error case
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-details">
      <Link to="/home" className="back-button">
        Back
      </Link>
      {postDetails && (
        <div>
          <h2 className="post-title">{postDetails.title}</h2>
          <p className="post-description">{postDetails.description}</p>
          <div className="post-info">
            <span>Wallet Address: {postDetails.walletAddress}</span>
            <span>Timestamp: {postDetails.timestamp}</span>
            <span>Total Votes: {postDetails.totalVotes}</span>
          </div>
          <div className="vote-buttons">
            <button
              className="vote-button upvote"
              disabled={isLoading}
              onClick={() => handleVote("upvote")}
            >
              Upvote
            </button>
            <button
              className="vote-button downvote"
              disabled={isLoading}
              onClick={() => handleVote("downvote")}
            >
              Downvote
            </button>
          </div>
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              className="comment-textarea"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button className="comment-submit" disabled={isLoading} type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
      <h3 className="comments-heading">Comments:</h3>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <p className="comment-text">{comment.text}</p>
          <div className="comment-info">
            <span className="comment-author">Posted by: {comment.author}</span>
            <span className="comment-timestamp">
              Timestamp: {comment.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetails;
