import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { actionTypes } from "../../Reducer";
import { useStateValue } from "../../StateProvider";

import {
  getFirestore,
  getDocs,
  setDoc,
  doc,
  collection,
  onSnapshot,
} from "@firebase/firestore";

function Login() {
  const history = useNavigate();
  const db = getFirestore();
  const userRef = collection(db, "users");

  const [{ completedOnboarding }] = useStateValue();
  const [userAddress, setUserAddress] = useState("");
  const [, dispatch] = useStateValue();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formActivated, setFormActivated] = useState(false);

  const { ethereum } = window;

  useEffect(() => {
    ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length > 0) {
          console.log("User is logged in and connected");
          if (!completedOnboarding) {
            const address = accounts[0];
            setUserAddress(address); // Store user's address in state
            dispatch({
              type: actionTypes.SET_USER,
              user: address,
            });
            setFormActivated(true);
          } else {
            history("/");
          }
        } else {
          console.log("User is not logged in or connected");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const web3 = new Web3(window.ethereum);
        const address = accounts[0];

        setUserAddress(address); // Store user's address in state
        dispatch({
          type: actionTypes.SET_USER,
          user: address,
        });

        console.log("Connected to MetaMask");
        console.log("Web3 Version:", web3.version);
        console.log("User Address:", address);

        setFormActivated(true); // Activate the form

        // Continue with your logic or redirect to the authenticated area
        //history("/home");
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("Please install MetaMask or use a compatible browser.");
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("Please enter both Firstname and Lastname");
      return;
    }

    // Store the firstname, lastname, and address in an array
    const userData = {
      address: userAddress,
      firstName: firstName,
      lastName: lastName,
    };

    // Setting the new users into firebase database.
    await setDoc(doc(userRef, userAddress), {
      firstName: firstName,
      lastName: lastName,
      posts: [],
    });

    await dispatch({
      type: actionTypes.SET_LOGGED_IN,
      loggedIn: true,
    });

    // Perform further processing with the userData array as per your requirements
    console.log("User Data:", userData);

    // Navigate to the '/home' page
    history("/home");
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
      {formActivated ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Firstname"
              className="input-field"
              required
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <input
              type="text"
              placeholder="Lastname"
              className="input-field"
              required
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      ) : (
        <button className="connect-button" onClick={connectToMetaMask}>
          Connect with MetaMask
        </button>
      )}
      {/* {userAddress && (
        <p className="connected-address">Connected Address: {userAddress}</p>
      )} */}
    </div>
  );
}

export default Login;
