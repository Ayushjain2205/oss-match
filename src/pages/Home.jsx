import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col">
        <p className="font-semibold text-4xl mt-12 self-center text-secondary">
          Let OSS-Match find the perfect open source issue for you to work on
        </p>

        <Player
          autoplay
          loop
          src="https://assets7.lottiefiles.com/private_files/lf30_wqypnpu5.json"
          style={{ height: "600px", width: "600px" }}
        ></Player>
        <Link className="self-center" to="/">
          <button className="btn btn-accent self-center">
            Sign In with &nbsp; <i class="fa-brands fa-github"></i> &nbsp;
            Github
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
