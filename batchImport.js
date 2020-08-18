const { MongoClient } = require("mongodb");
require("dotenv").config();
const assert = require("assert");
const fs = require("fs");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));
//db.users.drop();
//db.users.remove();
//db.users.dropIndex()
const batchImport = async () => {
  console.log("hii");

  try {
    //creates new client
    const client = await MongoClient(MONGO_URI, options);
    //connects to the client
    await client.connect();
    //connect to the database
    const db = client.db("exercises");
    console.log("Connected");

    const r = await db.collection("greetings").insertMany(greetings);

    assert.equal(greetings.length, r.insertedCount);
    console.log("success");
    //close the connection to the database server
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

batchImport();
