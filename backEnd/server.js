const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, '/client/build')))
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));



const uri = process.env.ATLAS_URI;
mongoose
.connect(uri, { useUnifiedTopology: true,
	 useNewUrlParser: true, 
	 useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

// mongoose
// .set("userCreateIndex", true, "useFindandModify", false)
mongoose.Promise = global.Promise

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/user');


  



app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use(function(req,res, next){
	res.header("Access-Control_Allow_Origin", "*")
	res.header("Access-Control-Allow_Headers", "Origin, X-Requested-With, Content-Type, Accept")
 next()
})


app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

module.exports = app
