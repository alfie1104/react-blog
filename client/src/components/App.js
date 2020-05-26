import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={About} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
