import React from "react";
import NavBarStyle from "./NavBarStyle";
import logoImg from "../../assets/images/logo.png";

export default function NavBar() {
  return (
    <NavBarStyle>
      <div className="logo">
        <img src={logoImg} alt="camera" className="logo" />
      </div>
    </NavBarStyle>
  );
}
