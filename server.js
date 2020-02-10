let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");

let SignUp = require("./src/endpoints/signUp.js");
let Login = require("./src/endpoints/login.js");
let AddTask = require("./src/endpoints/addTask.js");
let TaskList = require("./src/endpoints/taskList.js");
let DeleteTask = require("./src/endpoints/deleteTask.js");
let EditTask = require("./src/endpoints/editTask.js");
let CompletedTask = require("./src/endpoints/completedTask.js");

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

app.use(SignUp);
app.use(Login);
app.use(AddTask);
app.use(TaskList);
app.use(DeleteTask);
app.use(EditTask);
app.use(CompletedTask);

app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
