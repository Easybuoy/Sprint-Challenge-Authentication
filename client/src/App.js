import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Jokes from "./components/Jokes";

function App() {
  return (
    <Router className="App">
      <Route exact path="/" component={Jokes} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Router>
  );
}

export default App;
