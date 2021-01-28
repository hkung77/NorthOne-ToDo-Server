const express = require("express");
const cors = require("cors");
const router = express.Router();

const whiteList = [
  "https://northone-todo.netlify.app",
  "http://localhost:3000",
];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whiteList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

const { updateToDoList } = require("./updateToDoList");
const { addToDoList } = require("./addToDoList");
const { getToDoList } = require("./getToDoList");
const { deleteToDoList } = require("./deleteToDoList");

router.get("/toDoList", cors(corsOptionsDelegate), getToDoList);
router.post("/toDoList", cors(corsOptionsDelegate), addToDoList);
router.delete("/toDoList", cors(corsOptionsDelegate), deleteToDoList);
router.patch("/toDoList", cors(corsOptionsDelegate), updateToDoList);

module.exports = router;
