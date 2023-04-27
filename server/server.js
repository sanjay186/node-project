//const run = require("./mongoDb");
const express = require("express");
const cors = require("cors");
const { MongoClient} = require('mongodb');
const redis = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

const cl = new MongoClient("mongodb+srv://sanjayinfortech:Sanjay1860@cluster0.dxo7ihi.mongodb.net/?retryWrites=true&w=majority");
var client = redis.createClient({
    socket: { host: "redis-16618.c305.ap-south-1-1.ec2.cloud.redislabs.com",
  port: 16618
},
  password: "7GWs2bN3lmr6tbqJCrRwVQt7AB2Rtj2l",
});

 (async () => {
    await client.connect();
 })();
client.on('ready', () => {
    console.log("Connected!");
});
client.on('error', () => {
    console.log("errr");
});
client.on('connect', () => console.log('Redis Client Connected'));

app.get("/get",(req,res)=>{
   
    async function run() { 

      try {
      
        await cl.connect();
        const coll=  cl.db("sample_restaurants").collection("restaurants");
        let items = [];
        const cur = coll.find({}).limit(5);
        await cur.forEach(function(doc){
            items.push(doc);
        });
        client.set("AllItems",JSON.stringify(cur));
      res.end(JSON.stringify(items));
   
      } catch (err){
        console.warn("ERROR: " + err);
       
      } finally {
       // await cl.close();
      }
    }
    run().catch(console.dir);
   

  
});

app.get("/fetchById/:id",(req,res)=>{

  async function run() { 
    let results;
    let isCached = false;
    try {
     
        const cacheResults = await client.get(req.params.id);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: isCached,
        data: results,
      });
      
    } else {
      await cl.connect();
      console.log("id....>>", req.params.id )
       const coll=  cl.db("sample_restaurants").collection("restaurants");
       const cur = await coll.findOne({
             "restaurant_id":
             req.params.id
         }).then(res=>res);
         console.log(cur)
         if(cur !== null){
      client.set( req.params.id , JSON.stringify(cur));
         console.log(cur)
         }
      
       res.send(  {fromCache: isCached,
        data:cur });
    }
   
    } catch (err){
      console.warn("ERROR: " + err);
      // eslint-disable-next-line no-undef
     // if (errCallback) errCallback(err);
    } finally {
     // await cl.close();
  
    }
  }
  run().catch(console.dir);

})

app.listen(8001,()=>{
    console.log("server is running in 8001 port")
});

//run().catch(console.dir);
