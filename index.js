const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello From TechBook')
})

app.listen(port, () => {
    console.log(`TechBook app listening on port ${port}`)
})