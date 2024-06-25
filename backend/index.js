const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
const connectDB=require("./config/db");
const studentRoute=require("./routes/studentRoute");
const quizRouter=require("./routes/quizRoutes");
const courseRouter=require("./routes/courseRoutes");

connectDB();
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use("/api/student",studentRoute);
app.use("/api/quiz",quizRouter);
app.use("/api/course",courseRouter);
app.get('/', (req, res) => {
  res.send('Successful response.');
});



app.listen(3000,()=> console.log('Example app is listening on port 3000.'));