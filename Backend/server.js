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

app.post('/deleteProduct/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {productId} = req.body;
    try{
        let db = await client.db('Shopzy');
        console.log(productId);
            await db.collection('Product').deleteOne({_id: new mongodb.ObjectId(productId)});
            res.json({
                msg: "1 Product Deleted"
            });
        
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})

app.post('/addProduct/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {name, price, type, desc} = req.body;
    try{
        let db = await client.db('Shopzy');
            await db.collection('Product').insertOne({name: name, price: price, type: type, description: desc, image: "assets/products/dummy.png"});
            res.json({
                msg: "Product Created"
            });
        
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})  

app.post('/updateProduct/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {_id,name, price, type, desc} = req.body;
    try{
        let db = await client.db('Shopzy');
            await db.collection('Product').updateOne({_id: new mongodb.ObjectId(_id)},{$set:{name: name, price: price, type: type, description: desc}});
            res.json({
                msg: "Product Created"
            });
        
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})  

app.post('/createOrder/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    const {email} = req.body;
    try{
        let db = await client.db('Shopzy');
            var q = await db.collection('Cart').findOne({email: email}); 
            await db.collection('Order').insertOne({email : q["email"], items: q["items"]}); 
            await db.collection('Cart').deleteOne({email: email});
            res.json({
                msg: "Order Created"
            });
        
    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }
})  

app.post('/showOrders/in', async (req,res) => {
    const client = await mongoClient.connect(dburl);
    try{
        let db = await client.db('Shopzy');
        var data = await db.collection('Order').find().toArray();
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