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

let SignUp = app.post("/sign-up", upload.none(), (req, res) => {
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
      if (user !== null) {
        res.send(JSON.stringify({ success: false, message: "Username taken" }));
        return;
      } else {
        dbo
          .collection("users")
          .insertOne(
            { username: _username, password: _password },
            (error, user) => {
              res.cookie("sid", _sessionID);
              res.send(
                JSON.stringify({
                  success: true,
                  message: "Thank you for Signing Up!",
                  username: user.ops[0].username,
                  userID: user.ops[0]._id
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

module.exports = SignUp;
