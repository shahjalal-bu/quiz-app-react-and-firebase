import React from 'react';
import Account from './Account';
import styles from '../styles/Nav.module.css'
import { Link } from 'react-router-dom';
const Nav = () => {
    return (
        <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/" className={styles.brand}>
              <img src="./images/logo-bg.png" alt="Learn with Sumit Logo" />
              <h3>Learn with Sumit</h3>
            </Link>
          </li>
        </ul>
        <Account />
      </nav>
    );
};

export default Nav;