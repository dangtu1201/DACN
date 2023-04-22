import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://ddung:KbYxEDyj4qWHuADi@my-notes.ab8q1ok.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("DailyGroceries").collection("devices");
  
  client.close();
});