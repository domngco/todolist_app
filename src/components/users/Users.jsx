import React from "react";
import Login from "./Login.jsx";
import SignUpButton from "./SignUpButton.jsx";
import { Segment, Grid, Divider, Responsive } from "semantic-ui-react";

function Users() {
  return (
    <React.Fragment>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Login />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <SignUpButton />
          </Grid.Column>
        </Grid>
        <Responsive minWidth={768}>
          <Divider vertical>OR</Divider>
        </Responsive>
      </Segment>
    </React.Fragment>
  );
}

export default Users;
