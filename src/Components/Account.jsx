import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Nav.module.css";
import { useAuth } from "../contexts/AuthContext";
const Account = () => {
  const { currentUser,logout } = useAuth();

  return (
    <div className={styles.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser.displayName}</span>

          <span className="material-icons-outlined"
          onClick ={logout}
          >logout</span>
        </>
      ) : (
        <>
          <Link to="signup">Signup</Link>
          <Link to="login">Login</Link>
        </>
      )}

    </div>
  );
};

export default Account;
