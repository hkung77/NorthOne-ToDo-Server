var express = require("express");
var router = express.Router();

/* GET users listing. */
exports.getToDoList = router.get("/toDoList", function (req, res, next) {
  res.status(200).send([]);
});

exports.addToDoList = router.post("/toDoList", function (req, res, next) {
  res.status(200).send([]);
});

exports.deleteToDoList = router.post("/toDoList", function (req, res, next) {
  res.status(200).send([]);
});

exports.updateToDoList = router.post("/toDoList", function (req, res, next) {
  res.status(200).send([]);
});
