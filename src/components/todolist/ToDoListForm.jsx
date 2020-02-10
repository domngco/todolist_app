import React, { Component } from "react";
import { Form, Divider, Icon, Header, Table, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import ToDoListOptions from "./ToDoListOptions.jsx";
import DeleteTask from "./DeleteTask.jsx";
import EditTask from "./EditTask.jsx";
import CompletedTask from "./CompletedTask.jsx";

const initialState = {
  description: "",
  priority: undefined
};

export class UnconnectedToDoListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      priority: null,
      completed: false,
      tasks: [],
      column: null,
      direction: null
    };
  }

  componentDidMount() {
    this.handleTasks();
  }

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };

  handlePriority = (event, data) => {
    this.setState({ priority: data.value });
  };

  handleTasks = async () => {
    let data = new FormData();
    data.append("userID", this.props.userID);
    let response = await fetch("/tasks", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let tasks = body.message;
    this.setState({ tasks: tasks });
    console.log("this.state,", this.state);
  };

  handleSort = clickedColumn => () => {
    const { column, tasks, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        tasks: _.sortBy(tasks, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }
    this.setState({
      tasks: tasks.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  handleSubmit = async () => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.props.username);
    data.append("userID", this.props.userID);
    data.append("description", this.state.description);
    data.append("priority", this.state.priority);
    data.append("completed", this.state.completed);
    let response = await fetch("/add-task", {
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
      this.setState(initialState);
      this.handleTasks();
      return;
    }
    return;
  };

  render() {
    const { column, tasks, direction } = this.state;
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
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
          <Form.Button type="submit">Add</Form.Button>
        </Form>
        <Divider horizontal>
          <Header>
            <Icon name="list" />
            To Do List
          </Header>
        </Divider>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "description" ? direction : null}
                onClick={this.handleSort("description")}
              >
                Task
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "priority" ? direction : null}
                onClick={this.handleSort("priority")}
              >
                Priority
              </Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              tasks,
              ({ description, priority, _id, userID, completed }) => {
                const taskID = _id;
                const _userID = userID;
                const _completed = completed;
                return (
                  <Table.Row key={_id}>
                    <Table.Cell
                      style={
                        completed ? { borderLeft: "green solid thick" } : {}
                      }
                    >
                      {description}
                    </Table.Cell>
                    <Table.Cell>{priority}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button.Group>
                        <CompletedTask
                          taskID={taskID}
                          _completed={_completed}
                          handleTasks={this.handleTasks}
                        />
                        <EditTask
                          _userID={_userID}
                          taskID={taskID}
                          handleTasks={this.handleTasks}
                        />
                        <DeleteTask
                          taskID={taskID}
                          handleTasks={this.handleTasks}
                        />
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
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

let ToDoListForm = connect(mapStateToProps)(UnconnectedToDoListForm);
export default ToDoListForm;
