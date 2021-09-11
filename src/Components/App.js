import React from "react";
import "../styles/app.css";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import Quiz from "./Quiz";
import Results from "./Results";
import SignUp from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
const App = () => {

  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute exact path="/signup" component={SignUp} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/quiz/:id" component={Quiz} />
            <PrivateRoute exact path="/result/:id" component={Results} />
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
