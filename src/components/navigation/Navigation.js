import React from "react";
import "./Navigation.css";
import NavItems from "./NavItems";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

function Navigation() {
  return (
    <div className="navigation-container">
      {/* Home, Trending, Notifications, Profile, Logout */}
      <NavItems image={<HomeIcon />} name="Home" />
      <NavItems image={<WhatshotIcon />} name="Trending" />
      <NavItems image={<NotificationsIcon />} name="Notification" />
      <NavItems image={<PersonIcon />} name="Profile" />
    </div>
  );
}

export default Navigation;
