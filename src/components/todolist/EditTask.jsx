import React, { Component } from "react";
import { Icon, Button, Modal, Form } from "semantic-ui-react";
import ToDoListOptions from "./ToDoListOptions.jsx";
import { withRouter } from "react-router-dom";

export class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      priority: null,
      completed: false,
      open: false
    };
  }

  closeConfigShow = closeOnDimmerClick => () => {
    this.setState({ closeOnDimmerClick, open: true });
  };

  close = () => this.setState({ open: false });

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };

  handlePriority = (event, data) => {
    this.setState({ priority: data.value });
  };
  handleEdit = async () => {
    event.preventDefault();
    let taskID = this.props.taskID;
    let userID = this.props._userID;
    let data = new FormData();
    data.append("taskID", taskID);
    data.append("userID", userID);
    data.append("description", this.state.description);
    data.append("priority", this.state.priority);
    data.append("completed", this.state.completed);
    let response = await fetch("/edit-task", {
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
      this.close();
      return;
    }
  };
  render() {
    const { open, closeOnDimmerClick } = this.state;
    return (
      <React.Fragment>
        <Button icon onClick={this.closeConfigShow(true, false)}>
          <Icon color="blue" name="edit" />
        </Button>
        <Modal
          open={open}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Edit Task</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleEdit}>
              <Form.Group widths="equal">
                <Form.Input
                  type="text"
                  placeholder="Enter Task"
                  onChange={this.handleDescription}
                  value={this.state.description}
                />
                <ToDoListOptions
                  handlePriority={this.handlePriority}
                  value={this.state.priority}
                  ref="priority"
                />
              </Form.Group>
              <Form.Group>
                <Form.Button type="submit">Confirm</Form.Button>
                <Form.Button onClick={this.close}>Cancel</Form.Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(EditTask);
