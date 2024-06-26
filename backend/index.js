const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
const connectDB=require("./config/db");

const studentRoute=require("./routes/studentRoute");
const courseRouter=require("./routes/courseRoutes");
const scoreRouter=require("./routes/scoreRoute")

connectDB();
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use("/api/student",studentRoute);
app.use("/api/course",courseRouter);
app.use("/api/score",scoreRouter)

app.get('/', (req, res) => {
  res.send('Successful response.');
});



app.listen(5000,()=> console.log('Example app is listening on port 5000.'));