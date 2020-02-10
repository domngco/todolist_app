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

let DeleteTask = app.post("/delete-task", upload.none(), (req, res) => {
  let _taskID = req.body.taskID;
  try {
    dbo.collection("tasks").deleteOne({ _id: ObjectID(_taskID) });
    return res.send(
      JSON.stringify({
        success: true,
        message: "Selected Task has been deleted"
      })
    );
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

module.exports = DeleteTask;
