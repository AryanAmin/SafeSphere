import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import "./App.css";
import RecommendFollowers from "./components/recommendFollowers/RecommendFollowers";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
