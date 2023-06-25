import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import "./App.css";
import RecommendFollowers from "./components/recommendFollowers/RecommendFollowers";
import PostDetails from "./components/postDetails/postDetails";
import "./backend/firebase";
import {init} from "@airstack/airstack-react";

const AIRSTACK_API_KEY = 'f3c9e8e80a72463f916ef23092f3bf59';
init(AIRSTACK_API_KEY);

function App() {
  return (
    <div>
      <Router>
        <Routes>
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
            path="/post/:id"
            element={
              <div className="components-container">
                <Navigation />
                <PostDetails />
                <RecommendFollowers />
              </div>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
