import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Board from "./components/Board/Board";

import "./app.css";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/board/:id" component={Board} />
    </Router>
  );
};

export default App;
