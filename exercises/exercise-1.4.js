const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const newUser = req.body;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  //DATABASE NAME!!!!
  const db = client.db("exercise_1");
  console.log("connected");
  //create/insertOne() method to add a user
  await db.collection("users").insertOne(newUser);

  const users = await db.collection("users").find().toArray();
  res.status(201).json({ message: "success", users: users });

  client.close();
};

module.exports = { addUser };
