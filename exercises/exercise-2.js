const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");
const { EEXIST } = require("constants");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    console.log("connected");
    const db = client.db("exercises");
    console.log("connected");
    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

const deleteGreeting = async (req, res) => {
  try {
    const _id = req.params._id;
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("exercises");

    const r = await db.collection("greetings").deleteOne({ _id });
    assert.equal(1, r.deletedCount);
    res.status(204).json({ status: 204, _id, data: result });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const getGreeting = async (req, res) => {
  const _id = req.param._id;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercises");

  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getGreetings = async (req, res) => {
  const _id = req.param._id;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("exercises");

  const result = await db.collection("greetings").find().toArray();
  console.log(result);

  let start = 0;
  let max = 25;
  if (req.query.start !== undefined) {
    start = Number(req.query.start);
  }
  if (req.query.max !== undefined) {
    max = Number(req.query.max);
  }
  if (result.length > 0) {
    res
      .status(200)
      .json({ status: 200, data: result.slice(start, start + max) });
    client.close();
  } else {
    console.log(err.message);
    res.status(404).json({ status: 404, data: "Not Found" });
  }
};

const updateGreeting = async (req, res) => {
  const _id = req.params._id;
  //res.status(200).json({ status: 200, _id, ...req.body });
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("exercise_1");
    const newValues = { $set: { hello: req.body.hello } };
    console.log(req.body.hello);
    if (req.body.hello === undefined) {
      throw new Error("you need to enter a greeting");
    }
    const r = await db.collection("greetings").updateOne({ _id }, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(200).json({ status: 200, data: { ...req.body } });
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .json({ status: 500, data: { ...req.body }, message: err.message });
  }
  client.close();
};
module.exports = {
  getGreeting,
  createGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};
