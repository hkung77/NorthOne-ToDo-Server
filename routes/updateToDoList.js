const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const router = express.Router();

exports.updateToDoList = router.patch("/toDoList", function (req, res, next) {
  const MONGO_USERNAME = process.env.MONGODB_USERNAME;
  const MONGO_PASSWORD = process.env.MONGODB_PASSWORD;
  const URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@magic.uxmiw.mongodb.net/magic?authSource=admin&retryWrites=true&w=majority`;

  const { id, title, description, dueDate, status } = req.body;

  // Backend validation
  // Ensure a id exists
  if (id.length === 0) {
    res.status(400).send({ error: "Title cannot be empty" });
  } else {
    // Instantiate to client
    const client = new MongoClient(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to client
    client.connect(async (err) => {
      if (err) {
        client.close();
        throw err;
      }
      try {
        await client
          .db("NorthOne")
          .collection("ToDoList")
          .findOneAndUpdate(
            { _id: new mongodb.ObjectID(id) },
            { $set: { title, description, dueDate, status } },
            { returnOriginal: false },
            (error, response) => {
              if (error) {
                throw error;
              } else {
                res.status(200).send(response.value);
              }
            }
          );
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Unexpected Error Occured" });
      }
    });
  }
});
