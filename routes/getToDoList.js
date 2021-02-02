const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const router = express.Router();

/* GET users listing. */
exports.getToDoList = router.get("/toDoList", function (req, res, next) {
  const MONGO_USERNAME = process.env.MONGODB_USERNAME;
  const MONGO_PASSWORD = process.env.MONGODB_PASSWORD;

  const URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@magic.uxmiw.mongodb.net/magic?authSource=admin&retryWrites=true&w=majority`;
  const { search = "" } = req.query;

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
      let toDoList = await client
        .db("NorthOne")
        .collection("ToDoList")
        .find()
        .toArray();

      // Filters items by search text
      if (search.length > 0) {
        toDoList = toDoList.filter((toDoItem) =>
          toDoItem.title.match(new RegExp(search, "gi"))
        );
      }

      res.status(200).send(toDoList);

      client.close();
    } catch (error) {
      console.error(error);
      client.close();
      res.status(500).send({ error: "Unexpected Error Occured" });
    }
  });
});
