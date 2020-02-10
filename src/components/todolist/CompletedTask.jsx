import React, { Component } from "react";
import { Icon, Button } from "semantic-ui-react";

export class CompletedTask extends Component {
  handleComplete = async () => {
    event.preventDefault();
    let taskID = this.props.taskID;
    let completed = !this.props._completed;
    console.log("completed,", completed);
    let data = new FormData();
    data.append("taskID", taskID);
    data.append("completed", completed);
    let response = await fetch("/completed-task", {
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
      this.props.handleTasks();
      return;
    }
  };

  render() {
    return (
      <Button icon>
        <Icon color="green" onClick={this.handleComplete} name="check" />
      </Button>
    );
  }
}

export default CompletedTask;
