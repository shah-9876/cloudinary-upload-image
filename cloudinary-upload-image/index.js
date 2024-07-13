const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const uploadRoute = require('./controller/routeUpload');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/upload').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});




//the route 
app.use("/api/users" , uploadRoute);


//posrt connection 
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
