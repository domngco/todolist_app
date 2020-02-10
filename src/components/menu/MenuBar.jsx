import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

function MenuBar() {
  return (
    <Menu borderless size="massive">
      <Menu.Item name="ToDoList" position="left">
        <Icon name="list" />
        ToDoList App
      </Menu.Item>
      <Menu.Item as={Link} to="/users" position="right">
        <Icon name="sign-in" />
      </Menu.Item>
    </Menu>
  );
}

export default MenuBar;
