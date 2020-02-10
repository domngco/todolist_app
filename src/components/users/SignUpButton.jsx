import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

function SignUpButton() {
  return (
    <Button animated as={Link} to="/sign-up" style={{ width: 100 }}>
      <Button.Content visible>Sign Up</Button.Content>
      <Button.Content hidden>
        <Icon name="signup" />
      </Button.Content>
    </Button>
  );
}

export default SignUpButton;
