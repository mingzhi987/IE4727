import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import FormValidationExample from "./FormValidationExample";
import RegisterValidation from "./RegisterValidation";
import LogInValidation from "./LogInValidation";

import "./App.css";

function App() {
  const [isRegisterPage, setIsRegisterPage] = useState(true);

  const togglePage = () => {
    setIsRegisterPage((prevIsRegisterPage) => !prevIsRegisterPage);
  };

  return (
    <div className="page">
      {isRegisterPage ? (
        <>
        <RegisterValidation />
        <span>
          Already have an account? <a onClick={togglePage}>Login</a>
        </span>
      </>
      ) : (
        <>
        <LogInValidation />
        <span>
          Don't have an account? <a onClick={togglePage}>Register</a>
        </span>
      </>
      )}
    </div>
  );
}

export default App;