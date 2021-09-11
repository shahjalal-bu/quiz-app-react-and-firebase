import React, { useState } from "react";
import Form from "./Form";
import Illustration from "./Illustration";
import styles from "../styles/signUp.module.css";
import TextInput from "./TextInput";
import Button from "./Button";

//for login form

import { useAuth } from "../contexts/AuthContext";

import { Link, useHistory } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h1>Login to your account</h1>
      <div className="column">
        <Illustration />
        <LoginForm />
      </div>
    </>
  );
};

export default Login;

//login from

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const { login } = useAuth();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login");
    }
  }
  return (
    <Form className={styles.login} onSubmit={handleSubmit}>
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
      {error && <p className="error">{error}</p>}
      <Button type="submit" disable = {loading}>
        <span>Submit Now</span>
      </Button>
      <div className="info">
        Don't have an account?{" "}
        <Link to="signup">
          <span>SingUp </span>
        </Link>
        instead.
      </div>
    </Form>
  );
};
