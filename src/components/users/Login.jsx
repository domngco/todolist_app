import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmit = async () => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert(body.message);
      return;
    }
    if (body.success) {
      alert(body.message);
      this.props.dispatch({
        type: "login-successful",
        username: body.username,
        userID: body.userID
      });
    }
    this.props.history.push("/to-do-list/" + this.props.userID);
    return;
  };

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="username"
            onChange={this.handleChange("username")}
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            placeholder="password"
            onChange={this.handleChange("password")}
          />
          <Form.Button type="submit" primary style={{ width: 100 }}>
            Login
          </Form.Button>
        </Form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    userID: state.userID
  };
};

let Login = connect(mapStateToProps)(UnconnectedLogin);
export default withRouter(Login);
