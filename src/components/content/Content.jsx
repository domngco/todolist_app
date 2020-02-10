import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "../users/Users.jsx";
import SignUp from "../users/SignUp.jsx";
import ToDoList from "../todolist/ToDoList.jsx";

function Content() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact={true} path="/" />
        <Route exact={true} path="/users" component={Users} />
        <Route exact={true} path="/sign-up" component={SignUp} />
        <Route exact={true} path="/to-do-list/:id" component={ToDoList} />
      </Switch>
    </React.Fragment>
  );
}

export default Content;
