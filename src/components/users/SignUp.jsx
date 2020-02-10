import React, { Component } from "react";
import { Form, Grid, Segment, Message } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

export class UnconnectedSignUp extends Component {
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
    let response = await fetch("/sign-up", {
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
        type: "signup-successful",
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
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 500 }}>
            <Segment>
              <Form onSubmit={this.handleSubmit} size="large">
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
                  type="password"
                  onChange={this.handleChange("password")}
                />
                <Form.Button fluid type="submit" primary>
                  Sign Up
                </Form.Button>
              </Form>
              <Message size="small">
                <p>
                  Already have an account? <Link to="/users">Login</Link>
                </p>
              </Message>
            </Segment>
          </Grid.Column>
        </Grid>
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

let SignUp = connect(mapStateToProps)(UnconnectedSignUp);
export default withRouter(SignUp);
