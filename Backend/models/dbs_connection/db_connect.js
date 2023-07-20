import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://ddung:yjbcEXVQhI6qcmRr@dailygroceries.i9b1fll.mongodb.net/DailyGroceries?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("DailyGroceries").collection("devices");
  
  client.close();
});