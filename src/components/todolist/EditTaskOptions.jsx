import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import _ from "lodash";

const priority = [
  {
    key: 5,
    text: "Highest",
    value: "Highest",
    icon: { color: "red", name: "double angle up" }
  },
  {
    key: 4,
    text: "High",
    value: "High",
    icon: { color: "red", name: "angle up" }
  },
  {
    key: 3,
    text: "Medium",
    value: "Medium",
    icon: { color: "yellow", name: "minus" }
  },
  {
    key: 2,
    text: "Low",
    value: "Low",
    icon: { color: "blue", name: "angle down" }
  },
  {
    key: 1,
    text: "Lowest",
    value: "Lowest",
    icon: { color: "blue", name: "double angle down" }
  }
];

export class EditTaskOptions extends Component {
  render() {
    return (
      <Form.Select
        onChange={this.props.handlePriority}
        type="text"
        placeholder="Priority"
        options={priority}
        value={this.props.value ? this.props.value : ""}
      />
    );
  }
}

export default EditTaskOptions;
