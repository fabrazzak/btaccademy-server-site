const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

// middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.utzmgoh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const studentsCollection = client.db("btaccademy").collection("students");

    app.get("/students", async (req, res) => {
      const query = {};
      const cursor = studentsCollection.find(query);
      const students = await cursor.toArray();
      res.send(students);
    });

 app.post("/students",async(req,res)=>{
    const doc=req.body;
    console.log(doc);
    const result= await studentsCollection.insertOne(doc);
       res.send(result);
 })


  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Genius Server");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
