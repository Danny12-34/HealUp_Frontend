import React from "react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Main page content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Global footer */}
      <Footer />
    </div>
  );
};

export default Layout;
