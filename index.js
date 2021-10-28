const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//UQgyArOIJtmgGQ2d

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://israkkayump1:UQgyArOIJtmgGQ2d@cluster0.4c1ex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("foodMaster");
      const usersCollection = database.collection("users");
      
      app.get('/users', async(req, res) => {
          const cursor = usersCollection.find({});
          const users = await cursor.toArray();
          res.send(users);
      });

      app.get('/users/:id', async (req, res) => {
          const id = req.params.id;
          const query = {_id: ObjectId(id)};
          const user = await usersCollection.findOne(query);
          res.send(user);
      })

      app.post('/users', async(req, res) => {
           const newUser = req.body;
           const result = await usersCollection.insertOne(newUser);
           res.json(result);
      });

      app.delete('/users/:id', async(req, res) => {
          const id = req.params.id;
          const query = {_id: ObjectId(id)};
          const result = await usersCollection.deleteOne(query);
          res.json(result);
      })

    }
      finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hellow World');
});

app.listen(port, () => {
    console.log('port', port);
})