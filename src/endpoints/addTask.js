let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let authData = require("./authData");
let cookieParser = require("cookie-parser");

app.use(cookieParser());

let MongoClient = require("mongodb").MongoClient;
let dbo = undefined;
MongoClient.connect(
  authData.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    dbo = db.db(authData.dataBase);
  }
);

let AddTask = app.post("/add-task", upload.none(), (req, res) => {
  let _userID = req.body.userID;
  let _description = req.body.description;
  let _priority = req.body.priority;
  let _completed = JSON.parse(req.body.completed);
  console.log("****, ", _completed);
  if (_description === "") {
    return res.send(
      JSON.stringify({
        success: false,
        message: "Please enter a description"
      })
    );
  }
  if (_priority === "") {
    return res.send(
      JSON.stringify({
        success: false,
        message: "Please add a priority"
      })
    );
  }
  try {
    dbo
      .collection("tasks")
      .findOne({ description: _description }, (error, task) => {
        if (task !== null) {
          res.send(
            JSON.stringify({
              success: false,
              message: _description + " is already on the list"
            })
          );
        } else {
          dbo.collection("tasks").insertOne(
            {
              userID: _userID,
              description: _description,
              priority: _priority,
              completed: _completed
            },
            error => {
              res.send(
                JSON.stringify({
                  success: true,
                  message: _description + " has been added!"
                })
              );
              return;
            }
          );
        }
      });
  } catch (error) {
    return res.send(
      JSON.stringify({
        success: false,
        message: error.toString()
      })
    );
  }
});

module.exports = AddTask;
