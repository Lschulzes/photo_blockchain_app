import React from "react";
import NavBarStyle from "./NavBarStyle";
import logoImg from "../../assets/images/logo.png";
import Identicon from "identicon.js";

type NavbarType = {
  account?: string | null | undefined;
};

export default function NavBar({ account }: NavbarType) {
  return (
    <NavBarStyle>
      <div className="logo">
        <img src={logoImg} alt="camera" className="logo" />
      </div>
      {account ? (
        <div className="account-details">
          <small className="account-address">{account}</small>
          <img
            className="ml-2"
            width="30"
            height="30"
            src={`data:image/png;base64,${new Identicon(
              account,
              30
            ).toString()}`}
          />
        </div>
      ) : (
        <span></span>
      )}
    </NavBarStyle>
  );
}
