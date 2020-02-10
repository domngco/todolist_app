let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let authData = require("./authData");

let MongoClient = require("mongodb").MongoClient;
let dbo = undefined;
MongoClient.connect(
  authData.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    dbo = db.db(authData.dataBase);
  }
);

let TaskList = app.post("/tasks", upload.none(), (req, res) => {
  let _userID = req.body.userID;
  if (_userID === undefined) {
    res.send(
      JSON.stringify({
        success: false,
        message: []
      })
    );
    return;
  }
  dbo
    .collection("tasks")
    .find({ userID: _userID })
    .toArray((error, tasks) => {
      try {
        res.send(
          JSON.stringify({
            success: true,
            message: tasks
          })
        );
        return;
      } catch (error) {
        res.send(
          JSON.stringify({
            success: false,
            message: error.toString()
          })
        );
        return;
      }
    });
});

module.exports = TaskList;
