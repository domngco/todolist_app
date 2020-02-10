import React, { Component } from "react";
import { Icon, Button } from "semantic-ui-react";

export class DeleteTask extends Component {
  handleDelete = async () => {
    event.preventDefault();
    let taskID = this.props.taskID;
    let data = new FormData();
    data.append("taskID", taskID);
    let response = await fetch("/delete-task", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert(body.message);
      return;
    }
    if (body.success) {
      alert(body.message);
      this.props.handleTasks();
      return;
    }
  };

  render() {
    return (
      <Button icon>
        <Icon color="red" onClick={this.handleDelete} name="delete" />
      </Button>
    );
  }
}

export default DeleteTask;
