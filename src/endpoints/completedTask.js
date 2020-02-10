let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
let authData = require("./authData");

let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;

let dbo = undefined;
MongoClient.connect(
  authData.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    dbo = db.db(authData.dataBase);
  }
);

let CompletedTask = app.post("/completed-task", upload.none(), (req, res) => {
  let _taskID = req.body.taskID;
  let _completed = JSON.parse(req.body.completed);
  console.log("completed, ", _completed);
  dbo.collection("tasks").updateOne(
    { _id: ObjectID(_taskID) },
    {
      $set: {
        completed: _completed
      }
    }
  );
  return res.send(
    JSON.stringify({
      success: true,
      message: "Selected Task has been Updated!"
    })
  );
});

module.exports = CompletedTask;
