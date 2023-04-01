import React from "react";

const Navbar = ({ signOut, userName }) => {
  return (
    <div className="navbar bg-[#272A36]">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">OSS-MATCH</a>
      </div>
      <div className="flex-none">
        <p className=" normal-case text-xl">
          <i className="fa-brands fa-github"></i>
          &nbsp;{userName}
        </p>
      </div>
      {/* <div className="flex-none">
        <button onClick={signOut}>Sign out</button>
      </div> */}
    </div>
  );
};

export default Navbar;
