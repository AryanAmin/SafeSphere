import React, { useState } from "react";
import "./NewPost.css";

import {
  getFirestore,
  collection,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from "@firebase/firestore";

import { useStateValue } from "../../StateProvider";

function NewPost() {
  const [{ user }] = useStateValue();
  const db = getFirestore();
  const postRef = collection(db, "posts");

  // New post form state
  const [newPost, setNewPost] = useState({
    walletAddress: "",
    title: "",
    description: "",
    totalVotes: 0,
    timeStamps: null,
    voteContributions: {},
    comments: [],
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
  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.description != null && newPost.title != null) {
      const newPostRef = doc(postRef);

      // Pushing the new post onto the database for access
      await setDoc(newPostRef, {
        walletAddress: user,
        title: newPost.title,
        description: newPost.description,
        totalVotes: 0,
        timeStamps: serverTimestamp(),
        voteContributions: {},
        comments: [],
      })
        .then(async () => {
          const userRef = doc(collection(db, "users"), user);
          await updateDoc(userRef, {
            posts: arrayUnion(newPostRef.id),
          });
        })
        .catch((e) => {
          console.log("Unable to create and store new post.");
        });

      // Clear the new post form
      setNewPost({
        walletAddress: "",
        title: "",
        description: "",
        totalVotes: 0,
        timeStamps: null,
        voteContributions: {},
        comments: [],
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
          name="description"
          placeholder="Post Content"
          value={newPost.description}
          onChange={handleInputChange}
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default NewPost;
