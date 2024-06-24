const express = require('express');
const cors=require("cors");
const connectDB=require("./config/db");



const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Successful response.');
});
connectDB();


app.listen(3000,()=> console.log('Example app is listening on port 3000.'));