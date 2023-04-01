import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { supabase } from "./utils/client";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(supabase);
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
      <div className="App">
        <Navbar
          signout={signOut}
          userName={userDetails.user_metadata.preferred_username}
        />
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

              <button onClick={signOut}>Sign out</button>
            </div>
          </div>
        </div>
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
