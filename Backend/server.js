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
    const {id, productId} = req.body;
    try{
        let db = await client.db('Shopzy');
        let q = await db.collection('Cart').findOne({user_id: id});
        if(q === null){
            await db.collection('Cart').insertOne({user_id: id, items: []});
        }
        q = await db.collection('Cart').findOne({user_id: id});
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
        await db.collection('Cart').updateOne({user_id: id},{$set: {items:items}});
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
    const {id} = req.body;
    try{
        let db = await client.db('Shopzy');
        let q = await db.collection('Cart').findOne({user_id: id});
        res.json(q);
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})
   
app.listen(3000,() => { console.log('Server running...');})