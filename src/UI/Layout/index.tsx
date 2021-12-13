import React, { ReactNode } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { AppStyle } from "../../styles/App";
type LayoutType = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutType) {
  return (
    <AppStyle>
      <NavBar />
      <h1>Edit this file in App.js</h1>
      <main>{children}</main>
      <Footer />
    </AppStyle>
  );
}
