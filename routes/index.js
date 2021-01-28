const express = require("express");
const router = express.Router();
const { updateToDoList } = require("./updateToDoList");
const { addToDoList } = require("./addToDoList");
const { getToDoList } = require("./getToDoList");
const { deleteToDoList } = require("./deleteToDoList");

router.get("/toDoList", getToDoList);
router.post("/toDoList", addToDoList);
router.delete("/toDoList", deleteToDoList);
router.patch("/toDoList", updateToDoList);

module.exports = router;
