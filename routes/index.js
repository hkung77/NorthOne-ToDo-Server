const express = require("express");
const router = express.Router();
const toDoList = require("./toDoList");

router.get("/toDoList", toDoList.getToDoList);
module.exports = router;
