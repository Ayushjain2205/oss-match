import React from "react";
import { Link } from "react-router-dom";

const Landing = ({ userDetails }) => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content -mt-72 flex-col lg:flex-row">
        <img
          className="mask mask-hexagon"
          src={userDetails.user_metadata.avatar_url}
        />
        <div>
          <h1 className="text-5xl font-bold">
            Hola! {userDetails.user_metadata.full_name}
          </h1>
          <Link to="/user">
            <button className="btn btn-primary mt-8">Let's roll!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
