import React from "react";
import logoImg from "../../assets/images/logo.png";
import FooterStyle from "./FooterStyle";

export default function Footer() {
  return (
    <FooterStyle>
      <div className="logo">
        <img src={logoImg} alt="logo" />
      </div>
    </FooterStyle>
  );
}
