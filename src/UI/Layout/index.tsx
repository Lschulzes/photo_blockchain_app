import React, { ReactNode } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { AppStyle } from "../../styles/App";
type LayoutType = {
  children?: ReactNode;
  account: string | null | undefined;
};

export default function Layout({ children, account }: LayoutType) {
  return (
    <AppStyle>
      <NavBar account={account} />
      <main style={{ paddingBottom: "5rem" }}>{children}</main>
      <Footer />
    </AppStyle>
  );
}
