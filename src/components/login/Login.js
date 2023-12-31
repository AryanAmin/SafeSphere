import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { actionTypes } from "../../Reducer";
import { useStateValue } from "../../StateProvider";

function Login() {
  const history = useNavigate();
  const [userAddress, setUserAddress] = useState("");
  const [, dispatch] = useStateValue(); 
  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });

        const web3 = new Web3(window.ethereum);
        console.log(accounts);
        const address = accounts[0];

        setUserAddress(address); // Store user's address in state
        dispatch({
          type: actionTypes.SET_USER,
          user: address,
        });
        console.log("Connected to MetaMask");
        console.log("Web3 Version:", web3.version);
        console.log("User Address:", address);

        history("/");
        
        // Continue with your logic or redirect to the authenticated area
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("Please install MetaMask or use a compatible browser.");
    }
  };

  useEffect(() => {
    const generateStars = () => {
      const sphere = document.querySelector(".sphere-animation");

      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.classList.add("sphere-star");
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        sphere.appendChild(star);
      }
    };

    generateStars();
  }, []);

  return (
    <div className="login-container">
      <h1 className="safesphere-title">SafeSphere</h1>
      <div className="sphere-animation"></div>
      <button className="connect-button" onClick={connectToMetaMask}>
        Connect with MetaMask
      </button>
      {userAddress && (
        <p className="connected-address">Connected Address: {userAddress}</p>
      )}
    </div>
  );
}

export default Login;
