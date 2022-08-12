const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aplzjwc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const allBlogsCollection = client.db('TechBook').collection('allBlogs');
        const programmingBlogsCollection = client.db('TechBook').collection('programmingBlogs');
        const foodBlogsCollection = client.db('TechBook').collection('foodBlogs');

        // GET all blogs from DB
        app.get('/allblogs', async (req, res) => {
            const query = {};
            const cursor = allBlogsCollection.find(query);
            const allblogs = await cursor.toArray();
            res.send(allblogs);
        })

        // GET one blog using specific ID
        app.get('/allblogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const blog = await allBlogsCollection.findOne(query);
            res.send(blog);
        })

        // GET categorised blog from DB
        app.get('/categoryblogs', async (req, res) => {
            const category = req.query.category;
            const query = { category: category };
            const cursor = allBlogsCollection.find(query);
            const categorisedBlogs = await cursor.toArray();
            res.send(categorisedBlogs)
        })


    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello From TechBook')
})

app.listen(port, () => {
    console.log(`TechBook app listening on port ${port}`)
})