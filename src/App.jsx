import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { supabase } from "./utils/client";

import Landing from "./pages/Landing";
import UserPage from "./pages/UserPage";
import Matches from "./pages/Matches";
import Repo from "./pages/Repo";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    /* when the app loads, check to see if the user is signed in */
    checkUser();
    /* check user on OAuth redirect */
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);
  async function checkUser() {
    /* if a user is signed in, update local state */
    const user = await supabase.auth.getUser();
    setUser(user);
  }
  async function signInWithGithub() {
    /* authenticate with GitHub */
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }
  async function signOut() {
    /* sign the user out */
    await supabase.auth.signOut();
    setUser(null);
  }
  if (user) {
    const userDetails = user.data.user;
    console.log(userDetails);
    return (
      <div className="App bg-[#272A36]">
        <Navbar
          signout={signOut}
          userName={userDetails.user_metadata.preferred_username}
        />
        <Routes>
          <Route path="/" element={<Landing userDetails={userDetails} />} />
          <Route
            path="/user"
            element={<UserPage userDetails={userDetails} />}
          />
          <Route path="/matches" element={<Matches />} />
          <Route path="/repo" element={<Repo />} />
        </Routes>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Hello, please sign in!</h1>
      <button onClick={signInWithGithub}>Sign In</button>
    </div>
  );
}

export default App;
