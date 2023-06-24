import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Fragment } from "react";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import "./App.css";
import RecommendFollowers from "./components/recommendFollowers/RecommendFollowers";
import PostDetails from "./components/postDetails/postDetails";
import ProfilePage from "./components/profilepage/profilepage";
import "./backend/firebase";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <div className="components-container">
                <Navigation />
                <Home />
                <RecommendFollowers />
              </div>
            }
          />
          <Route path="/post/:id" element={<div className="components-container">
                <Navigation />
                <PostDetails />
                <RecommendFollowers />
              </div>} />
          <Route
            path="/profile"
            element={<Fragment>
              <Navigation />
              <ProfilePage userId={'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'}/>
            </Fragment>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
