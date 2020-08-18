const { MongoClient } = require("mongodb"); //require the MongoClient
require("dotenv").config();
const { MONGO_URI } = process.env; //Gives us access to the databse using the URI in .env

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbFunction = async (dbName) => {
  //creates new client
  const client = await MongoClient(MONGO_URI, options);

  //connects to the client
  await client.connect();

  //connect to the database (databse is provided as an argument to the function)
  const db = client.db(dbName);

  console.log("connected!");

  await db.collection("users").insertOne({ name: "Buck Rogers" });

  //close the connection to the database server
  client.close();
  console.log("disconnected!");
};

dbFunction("exercise_1");
