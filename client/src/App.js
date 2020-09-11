import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/navbar.component";
import PropertiesList from "./components/properties-list.component";
import EditProperty from "./components/edit-property.component";
import CreateProperty from "./components/create-property.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
        <Route path="/" exact component={PropertiesList} />
        <Route path="/edit/:id" exact component={EditProperty} />
        <Route path="/create" exact component={CreateProperty} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
