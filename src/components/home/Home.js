import React, { useEffect, useState } from "react";
import "./Home.css";
import Posts from "../posts/posts";
import PostDetails from "../postDetails/postDetails";
import { useNavigate } from "react-router";
import { useStateValue } from "../../StateProvider";
import {
  getFirestore,
  getDocs,
  doc,
  collection,
  onSnapshot,
} from "@firebase/firestore";

const posts = [
  {
    title: "This is a post",
    body: "This is the body of the post",
    author: "John Doe",
    cid: 456,
  },
  {
    title: "This is another post",
    body: "This is the body of another post",
    author: "Jane Doe",
    cid: 635,
  },
];

function Home() {
<<<<<<< HEAD
  //const [{user}] = useStateValue();
=======
  const [{ user }] = useStateValue();
>>>>>>> e504e9b0a40baf489cabd7addb7142599a4f8270
  const history = useNavigate();
  const db = getFirestore();
  const usersRef = collection(db, "users");

  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (e, postCid) => {
    e.preventDefault();
    history(`/post/${postCid}`);
  };

  useEffect(() => {
    // const userCollectionRef = doc(collection(db, "users"), "walletAddress");
    // onSnapshot(userCollectionRef, (doc) => {
    //   console.log("Doc Data: ", doc.data());
    // });

    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log("All users: ", allUsers);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="home-container">
      {/*user*/}
      <h1>Main Feed</h1>
      <Posts posts={posts} onPostClick={handlePostClick} />
    </div>
  );
}

export default Home;
