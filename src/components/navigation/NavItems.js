import React from "react";

function NavItems({ image, name }) {
  return (
    <div className="nav-items">
      {image}
      <p id="itemName">{name}</p>
    </div>
  );
}

export default NavItems;
