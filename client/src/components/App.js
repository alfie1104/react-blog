import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About";
import Login from "./RegisterLogin";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={About} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
