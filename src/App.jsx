import { useState } from "react";
import "./App.css";
import GitHubLogin from "react-github-login";

function App() {
  const [count, setCount] = useState(0);
  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);

  return (
    <div className="App">
      <GitHubLogin
        clientId="c0793b9cdb31537dc710"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default App;
