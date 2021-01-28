const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const router = express.Router();

/* GET users listing. */
exports.getToDoList = router.get("/toDoList", function (req, res, next) {
  const MONGO_USERNAME = process.env.MONGODB_USERNAME;
  const MONGO_PASSWORD = process.env.MONGODB_PASSWORD;

  const URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@magic.uxmiw.mongodb.net/magic?authSource=admin&retryWrites=true&w=majority`;

  const client = new MongoClient(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect(async (err) => {
    if (err) {
      client.close();
      throw err;
    }
    try {
      const toDoList = await client
        .db("NorthOne")
        .collection("ToDoList")
        .find()
        .toArray();

      res.status(200).send(toDoList);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Unexpected Error Occured" });
    }
  });
});

// Create a new to do item
exports.addToDoList = router.post("/toDoList", function (req, res, next) {
  res.status(200).send([]);
});

exports.deleteToDoList = router.post("/toDoList", function (req, res, next) {
  res.status(200).send([]);
});

exports.updateToDoList = router.post("/toDoList", function (req, res, next) {
  res.status(200).send([]);
});
