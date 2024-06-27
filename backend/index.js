const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoute = require('./routes/studentRoute');
// const quizRouter = require('./routes/quizRoutes');
const courseRouter = require('./routes/courseRoutes');
const scoreRouter = require('./routes/scoreRoute');

connectDB(); // Assuming this connects to your database

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/student', studentRoute);
// app.use('/api/quiz', quizRouter);
app.use('/api/course', courseRouter);
app.use('/api/score', scoreRouter);

app.get('/', (req, res) => {
  res.send('Successful response.');
});
<<<<<<< HEAD

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
=======
app.listen(5000,()=> console.log('Example app is listening on port 5000.'));
>>>>>>> 7376c207900dcd4483afb87af2a5b6e4fb4faf7b
