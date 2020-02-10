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

let Login = app.post("/login", upload.none(), (req, res) => {
  let _username = req.body.username;
  let _password = req.body.password;
  let _sessionID = "" + Math.floor(Math.random() * 1000000);
  if (_username === "") {
    return res.send(
      JSON.stringify({
        success: false,
        message: "Please enter Username"
      })
    );
  }
  if (_password === "") {
    return res.send(
      JSON.stringify({
        success: false,
        message: "Please enter Password"
      })
    );
  }
  try {
    dbo.collection("users").findOne({ username: _username }, (error, user) => {
      if (user === null) {
        res.send(
          JSON.stringify({
            success: false,
            message: "Invalid Username Entered"
          })
        );
        return;
      }
      if (user.password !== _password) {
        res.send(
          JSON.stringify({
            success: false,
            message: "Invalid Password Entered"
          })
        );
        return;
      }
      if (user.password === _password) {
        dbo
          .collection("users")
          .updateOne(
            { username: _username },
            { $set: { sessionID: _sessionID } }
          );
        res.cookie("sid", _sessionID);
        res.send(
          JSON.stringify({
            success: true,
            message: "Welcome back!",
            username: user.username,
            userID: user._id
          })
        );
        return;
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

module.exports = Login;
