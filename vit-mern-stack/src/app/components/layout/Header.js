import { signOut, useSession } from "next-auth/react"; // Import signOut and useSession from next-auth/react
import React from "react";

function Header() {
  const { data: session } = useSession(); // Get the session data using useSession hook

  const handleSignOut = async () => {
    await signOut(); // Call signOut from NextAuth.js
    window.location.href = "/loginPage"; // Redirect to loginPage after signout
  };

  return (
    <div style={{ width: "100%" }}>
      <nav className="navbar fixed-top navbar-light" style={{ backgroundColor: '#1b663e', height: "7.5vh", width: "100%" }}>
        <a className="navbar-brand" href="#">
          <p style={{ color: 'white', display: 'inline', fontFamily: 'Times New' }}>
            <h1 style={{ display: "inline" }}>VIT</h1> (Vellore Campus)
          </p>
        </a>
        <div className="ml-auto"> {/* This div aligns items to the right */}
          {session ? (
            <button className="btn btn-outline-light" onClick={handleSignOut}>
              Sign Out <i className="bi bi-box-arrow-right" style={{ marginLeft: "5px" }}></i> {/* Bootstrap Icon for Sign Out */}
            </button>
          ) : null}
        </div>
      </nav>
    </div>
  );
}

export default Header;
