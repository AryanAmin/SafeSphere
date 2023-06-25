import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import "./App.css";
import RecommendFollowers from "./components/recommendFollowers/RecommendFollowers";
import PostDetails from "./components/postDetails/postDetails";
import "./backend/firebase";
import Profilepage from "./components/profilepage/profilepage";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";
import { useEffect } from "react";
import { init } from "@airstack/airstack-react";
import Trending from "./components/trending/trending";

const AIRSTACK_API_KEY = "f3c9e8e80a72463f916ef23092f3bf59";
init(AIRSTACK_API_KEY);

function App() {
  const [{ user, completedOnboarding }] = useStateValue();
  const [, dispatch] = useStateValue();
  const { ethereum } = window;

  useEffect(() => {
    ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length > 0) {
          console.log("User is logged in and connected");
          if (!completedOnboarding) {
            const address = accounts[0];
            dispatch({
              type: actionTypes.SET_USER,
              user: address,
            });
          }
        } else {
          console.log("User is not logged in or connected");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/trending"
            element={
              <div className="components-container">
                <Navigation />
                <Trending />
                <RecommendFollowers />
              </div>
            }
          />
          <Route
            path="/home"
            element={
              <div className="components-container">
                <Navigation />
                <Home />
                <RecommendFollowers />
              </div>
            }
          />
          <Route
            path="/postdetails/:postId"
            element={
              <div className="components-container">
                <PostDetails />
              </div>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/profile" element={
          <Profilepage userId={'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
