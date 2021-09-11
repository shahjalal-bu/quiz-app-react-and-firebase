import React from "react";
import Illustration from "./Illustration";
import SignUpFrom from "./SignUpFrom";

const SignUp = () => {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration />
        <SignUpFrom />
      </div>
    </>
  );
};

export default SignUp;
