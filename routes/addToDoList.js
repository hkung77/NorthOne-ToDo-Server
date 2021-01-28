const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const router = express.Router();

// Create a new to do item
exports.addToDoList = router.post("/toDoList", function (req, res, next) {
  const MONGO_USERNAME = process.env.MONGODB_USERNAME;
  const MONGO_PASSWORD = process.env.MONGODB_PASSWORD;
  const URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@magic.uxmiw.mongodb.net/magic?authSource=admin&retryWrites=true&w=majority`;

  // Get todo item
  const { title, description, dueDate, status } = req.body;

  // Backend validation
  // Ensure a title exists
  if (title.length === 0) {
    res.status(400).send({ error: "Title cannot be empty" });
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
          .insertOne(
            {
              title,
              description,
              dueDate,
              status,
            },
            (error, response) => {
              if (error) {
                throw error;
              } else {
                // Returns newly created document
                res.status(201).send(response.ops[0]);
              }
            }
          );

        client.close();
      } catch (error) {
        console.log(error);
        client.close();
        res.status(500).send({ error: "Unexpected Error Occured" });
      }
    });
  }
});
