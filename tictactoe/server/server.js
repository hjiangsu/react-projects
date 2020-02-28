const mongoose = require('mongoose');
const express = require('express');
const passwordHash = require('password-hash');



// var cors = require('cors');
const bodyParser = require('body-parser');
// const logger = require('morgan');
const User = require('./userSchema');
const dotenv = require('dotenv').config();

const API_PORT = 3001;
const app = express();
// app.use(cors());
const router = express.Router();


console.log(process.env.MONGOLAB_URI)

// this is our MongoDB database
const dbRoute = process.env.MONGOLAB_URI;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/login', (req, res) => {
    const username = req.body.username;

    //console.log(username, hash);
    User.findOne({username: username}, (err, data) => {
        //console.log(data)
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, user: data});
    });
})

router.post('/register', (req, res) => {

    const hash = passwordHash.generate(req.body.password);
    let user = new User();

    user.username = req.body.username;
    user.password = hash;
    user.email = req.body.email;
    user.age = req.body.age;

    user.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
    //console.log(user);
});

//app.use(logger('dev'));


// this is our get method
// this method fetches all available data in our database
// router.get('/getData', (req, res) => {
//   Data.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

// this is our update method
// this method overwrites existing data in our database
// router.post('/updateData', (req, res) => {
//   const { id, update } = req.body;
//   Data.findByIdAndUpdate(id, update, (err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// this is our delete method
// this method removes existing data in our database
// router.delete('/deleteData', (req, res) => {
//   const { id } = req.body;
//   Data.findByIdAndRemove(id, (err) => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// this is our create methid
// this method adds new data in our database
// router.post('/putData', (req, res) => {
//   let data = new Data();

//   const { id, message } = req.body;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: 'INVALID INPUTS',
//     });
//   }
//   data.message = message;
//   data.id = id;
//   data.save((err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));