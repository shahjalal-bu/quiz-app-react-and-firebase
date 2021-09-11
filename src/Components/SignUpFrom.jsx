import React, { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const SignUpFrom = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // const [agree, setAgree] = useState("");
  const [loading, setLoading] = useState();
  const { signup } = useAuth();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password don't match !");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, userName);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed");
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit }>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Checkbox text={"I agree to the Terms & Conditions"} />

      <Button type='submit' disabled={loading}>
        <span>Submit Now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
};

export default SignUpFrom;
