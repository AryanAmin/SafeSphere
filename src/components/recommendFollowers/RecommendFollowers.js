import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, updateDoc, serverTimestamp, doc } from "firebase/firestore";
import "./RecommendFollowers.css";
import { useStateValue } from "../../StateProvider";
import { useNavigate } from "react-router";

function RecommendFollowers() {
  const [{user}] = useStateValue();

  const [followers, setFollowers] = useState([]);
  const db = getFirestore();
  const history = useNavigate();
  const followersCollection = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onSnapshot(followersCollection, (snapshot) => {
      const fetchedFollowers = snapshot.docs.map((doc) => ({
          id: doc.id, data: doc.data()}));
      setFollowers(fetchedFollowers);
    });

    return () => {
      unsubscribe();
    };
  }, [followersCollection]);

  const followHandlerListner = async (e, follower) =>  {
    e.preventDefault();

    // Following a person for the first time.
    await updateDoc(doc(collection(db, "users"), user), {
      followers: {
        [follower.id]: serverTimestamp()
      }
    }).then(async() => {
      await updateDoc(doc(collection(db, "users"), follower.id), {
        followers: {
          [user]: serverTimestamp()
        }
      })
    })

  }

  const profileClickHandler = (follower) => {
    history(`/profile/${follower.id}`)
  }

  const alreadyFriendCheck = (follower) => {
    // Check if the current users wallet address is in the follower dictionary
    console.log("Follower already check: ", follower);
  }

  // const onHandlePress = async (follower) => {
  //   console.log("Clicked on follower:", follower);  

  //   await updateDoc(currentUserDocRef, {
  //     followers: {
  //       [follower.id]: serverTimestamp()
  //     }
  //   })

  //   // window.location.href = "/profile/" + follower.id;
  // };

  return (
    <div className="recommendedFollowers-container">
      <h1>Followers</h1>
      <div className="followers-list">
        {followers.map((follower, index) => {
          return(
            <>
              {(follower.data.followers[user] === undefined && follower.id !== user)&& (
                <div key={index} className="follower-card">
                  <div className="follower-details">
                    <div className="wallet-address">{follower.id}</div>
                    <div className="name">
                      <a href="#" onClick={() => profileClickHandler(follower)}>
                        {follower.data.firstName} {follower.data.lastName}
                      </a>
                    </div>
                    <button
                      className="follow-button"
                      onClick={(e) => followHandlerListner(e, follower)}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              )}
            </>
          )
        })}
      </div>
    </div>
  );
}

export default RecommendFollowers;
