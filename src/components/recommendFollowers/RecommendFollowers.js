import React from "react";
import "./RecommendFollowers.css";

function RecommendFollowers() {
  const followers = [
    {
      walletAddress: "0x123456789",
      firstName: "John",
      lastName: "Doe",
    },
    {
      walletAddress: "0x987654321",
      firstName: "Jane",
      lastName: "Smith",
    },
    {
      walletAddress: "0x123456789",
      firstName: "John",
      lastName: "Doe",
    },
    {
      walletAddress: "0x123456789",
      firstName: "John",
      lastName: "Doe",
    },
    {
      walletAddress: "0x123456789",
      firstName: "John",
      lastName: "Doe",
    },
    {
      walletAddress: "0x123456789",
      firstName: "John",
      lastName: "Doe",
    },
    {
      walletAddress: "0x123456789",
      firstName: "John",
      lastName: "Doe",
    },
    {
      walletAddress: "0x123456789",
      firstName: "John",
      lastName: "Doe",
    },
    // Add more dummy followers here
    // ...
  ];

  const onHandlePress = (follower) => {
    // Handle the action when follow button or name link is pressed
    // For example, you can navigate to a specific route using window.location.href
    // Customize the navigation logic according to your requirements
    console.log("Clicked on follower:", follower);
    window.location.href = "/profile/" + follower.walletAddress;
    // Replace the above line with your desired navigation logic
  };

  return (
    <div className="recommendedFollowers-container">
      <h1>Follower</h1>
      <div className="followers-list">
        {followers.map((follower, index) => (
          <div key={index} className="follower-card">
            <div className="follower-details">
              <div className="wallet-address">{follower.walletAddress}</div>
              <div className="name">
                <a
                  href="#"
                  onClick={() => onHandlePress(follower)}
                >
                  {follower.firstName} {follower.lastName}
                </a>
              </div>
              <button
                className="follow-button"
                onClick={() => onHandlePress(follower)}
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendFollowers;
