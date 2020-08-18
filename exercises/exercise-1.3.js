const { MongoClient, db } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//This function will get the data from the datase
const getUsers = async (req, res) => {
  //create a client
  const client = await MongoClient(MONGO_URI, options);
  //connect to the client
  await client.connect();
  //connect client to database
  const db = client.db("exercise_1");

  const users = await db.collection("users").find().toArray();

  client.close();

  if (users.length > 0) {
    res.status(200).json({ status: 200, data: users });
  } else {
    res.status(404).type("txt").send("You got lost");
  }
};

module.exports = { getUsers };
