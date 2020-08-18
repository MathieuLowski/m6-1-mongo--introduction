const { MongoClient, db } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (dbName) => {
  //creating a client again
  const client = await MongoClient(MONGO_URI, options);
  //connects to the client
  await client.connect();
  //connect client to database(again the database is provided upon the function call)
  const db = client.db(dbName);
  //We declare users. The following code find the users stores in the exercice_1 Database
  const users = await db.collection("users").find().toArray();

  console.log(users);
  client.close();
};

getCollection("exercise_1");
