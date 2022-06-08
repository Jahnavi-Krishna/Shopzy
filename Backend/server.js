const express = require('express')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
const mongoClient = mongodb.MongoClient

app.use(cors({
    origin: '*'
}));
app.use(express.json());
let dburl = 'mongodb+srv://Jahnavi:janu2000@cluster0.gearm.mongodb.net/?retryWrites=true&w=majority'

app.post('/login/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {email, pwd} = req.body;
    try{
        let db = await client.db('Shopzy');
        let q = await db.collection('User').findOne({email: email});
        if(q === null){
            res.json({
                error: "Incorrect Email or Password!"
            })
        }else if(q['password'] === pwd){
        // await db.collection('UserInfo').updateOne({username: q["username"]},{$inc : {login_count: 1}});
            res.json({
                msg: "Success",
                role : q["role"]
            });
        }else{
            res.json({
                error: "Incorrect Email or Password!"
            })
        }
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})

app.post('/signup/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {email, pwd} = req.body;
    try{
        let db = await client.db('Shopzy');
        let q = await db.collection('User').findOne({email: email});
        if(q === null){
            await db.collection('User').insertOne({email: email, password: pwd, role: "USER"})
            res.json({
                msg: "SUCCESS"
            })
        }else{
            res.json({
                error: "User already exists!"
            })
        }
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})

app.post('/products/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    try{
        let db = await client.db('Shopzy');
        let q = await db.collection('Product').find().toArray();
        res.json({"products": q});

    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})
    
app.post('/add-to-cart/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {email, productId} = req.body;
    try{
        let db = await client.db('Shopzy');
        let q = await db.collection('Cart').findOne({email: email});
        if(q === null){
            await db.collection('Cart').insertOne({email: email, items: []});
        }
        q = await db.collection('Cart').findOne({email: email});
        items = q["items"];
        let i;
        for(i=0;i<items.length;i++){
            if(items[i].productId == productId){
                break;
            }
        }
        if(i<items.length) {
            items[i].count++;
        }
        else{
            items.push({productId:productId,count:1});
        }
        await db.collection('Cart').updateOne({email: email},{$set: {items:items}});
        console.log(q)
        res.json({"cart": q});

    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})

app.post('/subtract-from-cart/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {email, productId} = req.body;
    try{
        let db = await client.db('Shopzy');
        let q = await db.collection('Cart').findOne({email: email});
        if(q === null){
            await db.collection('Cart').insertOne({email: email, items: []});
        }
        q = await db.collection('Cart').findOne({email: email});
        items = q["items"];
        let i;
        for(i=0;i<items.length;i++){
            if(items[i].productId == productId){
                break;
            }
        }
        if(i<items.length) {
            items[i].count--;
            if(items[i].count == 0) {
                items.splice(i,1);
            }
            await db.collection('Cart').updateOne({email: email},{$set: {items:items}});
        }
        console.log(q)
        res.json({"cart": q});

    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})

app.post('/remove-from-cart/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {email, productId} = req.body;
    try{
        let db = await client.db('Shopzy');
        let q = await db.collection('Cart').findOne({email: email});
        if(q === null){
            await db.collection('Cart').insertOne({email: email, items: []});
        }
        q = await db.collection('Cart').findOne({email: email});
        items = q["items"];
        let i;
        for(i=0;i<items.length;i++){
            if(items[i].productId == productId){
                break;
            }
        }
        if(i<items.length) {
            items.splice(i,1);
            await db.collection('Cart').updateOne({email: email},{$set: {items:items}});
        }
        console.log(q)
        res.json({"cart": q});

    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})

app.post('/cart/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {email} = req.body;
    try{
        let db = await client.db('Shopzy');
        let q = await db.collection('Cart').findOne({email: email});
        res.json(q);
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})

app.post('/feedback/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {userEmail, feedback} = req.body;
    console.log(userEmail, feedback);
    try{
        let db = await client.db('Shopzy');
            await db.collection('Feedback').insertOne({email : userEmail, feedback: feedback});
            res.json({
                msg: "Feedback Received"
            });
        
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})
  
app.get('/feedback/all', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    try{
        let db = await client.db('Shopzy');
        var data = await db.collection('Feedback').find().toArray();
            res.json({
                data
            });
        
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})

app.listen(3000,() => { console.log('Server running...');})