const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const router = express.Router();

// Removes a to do item given an id
// 6012daa9d680ea6e8434eebc
exports.deleteToDoList = router.delete("/toDoList", function (req, res, next) {
  const MONGO_USERNAME = process.env.MONGODB_USERNAME;
  const MONGO_PASSWORD = process.env.MONGODB_PASSWORD;
  const URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@magic.uxmiw.mongodb.net/magic?authSource=admin&retryWrites=true&w=majority`;

  const { id } = req.body;
  if (id.length === 0) {
    res.status(400).send({ error: "Must provide an id" });
  } else {
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
        await client
          .db("NorthOne")
          .collection("ToDoList")
          .deleteOne({ _id: new mongodb.ObjectID(id) }, (error) => {
            if (error) {
              throw error;
            }
            res.status(204).send(null);
            client.close();
          });
      } catch (error) {
        console.error(error);
        client.close();
        res.status(500).send({ error: "Unexpected Error Occured" });
      }
    });
  }
});
