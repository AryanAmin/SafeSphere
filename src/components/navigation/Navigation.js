import React from "react";
import { useNavigate } from "react-router";
import "./Navigation.css";

function Navigation() {
  const history = useNavigate();
  const handleHomeClick = (e) => {
    e.preventDefault();
    history(`/home`);
  };
  const handleTrendingClick = (e) => {
    e.preventDefault();
    history(`/trending`);
  };
  return (
    <div className="navigation-container">
      <h1>Navigation</h1>
    <div className="nav-options">
        <h3 onClick={handleHomeClick}>Home</h3>
        <h3 onClick={handleTrendingClick}>Search</h3>
        <h3 onClick={handleTrendingClick}>Trending</h3>
    </div>
    </div>
  );
}

export default Navigation;
