// Add required modules
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const connectStore = require('connect-mongo');
const socketio = require('socket.io');

// Configure bcrypt settings
const saltRounds = 10;

// Configure .env information
dotenv.config();

// Add MongoDB Schemas
const User = require('./userSchema');

// Set up Express 
const API_PORT = 3001;
const app = express();
const router = express.Router();

const server = http.createServer(app);
const io = socketio(server);

// Set up connect-mongo for storing user sessions
const MongoStore = connectStore(session);

// Set up connection to MongoDB database
mongoose.connect(process.env.MONGOLAB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('Server has successfully connected to MongoDB database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Parse request into json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up express-session 
var sess = {
  name: 'session-id',
  secret: 'amazing octopus',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: db,
    collection: 'session',
    ttl: 14 * 24 * 60 * 60 //14 days
  }),
  cookie: {
    sameSite: true,
    secure: false, //development setting
    maxAge: 14 * 24 * 60 * 60 //14 days
  }
}

app.use(session(sess));

// Router for home - checks to see if you have an open session
router.get('/', (req, res) => {
  if (req.session.user) {
    console.log('Found open session')
    console.log(req.session.user)

    // Finds and returns the open session details
    User.findOne({ username: req.session.user.username }, (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      } else {
        const user = { username: data.username, email: data.email, age: data.age };
        return res.json({ success: true, user: user });
      }
    });
  }
  else {
    console.log('Could not find an open session')
    res.json({ success: false })
  }
});

// Login POST request
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Find a user in the database
  User.findOne({ username: username }, (err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    else if (!data) {
      return res.json({ success: false, error: 'Invalid username' })
    }
    else {

      // Check to see if the hashes are the same - create session if they are the same
      bcrypt.compare(password, data.password, (err, result) => {
        if (err) {
          return res.json({ success: false, error: err })
        }
        else if (!result) {
          return res.json({ success: false, error: 'Incorrect password' });
        }
        else {
          // Create user session
          const userSession = { userid: data.id, username: data.username };
          const user = { username: data.username, email: data.email, age: data.age };
          req.session.user = userSession;
          return res.json({ success: true, user: user });
        }
      });
    }
  });
})

// Register POST request
router.post('/register', (req, res) => {
  let user = new User();

  function addUser() {
    // Hash password before storing in database
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      else {
        // Retrieve all fields from the request body
        user.username = req.body.username;
        user.password = hash;
        user.email = req.body.email;
        user.age = req.body.age;

        // Save new user into database
        user.save((err) => {
          if (err) {
            console.log(err);
            return res.json({ success: false, error: err });
          }

          User.findOne({ username: user.username }, (err, data) => {
            if (err) return res.json({ success: false, error: err });

            const userSession = { userid: data.id, username: data.username };
            req.session.user = userSession;
            return res.json({ success: true, uid: user.id });
          });
        });
      }
    })
  }
  
  // Check to see if there is already a username with that name
  User.findOne({ username: req.body.username }, (err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    else if (!data) {
      addUser();
    }
    else {
      return res.json({ success: false, error: 'Username has already been taken' });
    }
  });
});

// Destroy session
router.get('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy(() => {
      return res.json({ success: true });
    });
  }
  else {
    return res.json({ success: false });
  }
});

// Create a socket connection
io.on('connection', (socket) => {
  console.log('connected');

  socket.on('remove-from-queue', (opponent) => {
    socket.leave('wait-queue');
    socket.join(opponent);
    io.to(opponent).emit('start-game', opponent);

    // io.in(opponentRoom).clients((err , clients) => {
    //   console.log(clients);
    // });
  })

  // Game queue
  socket.on('find-random-game', (data) => {

    console.log('finding random game for', data);
    const clients = io.nsps['/'].adapter.rooms['wait-queue'] || 0;

    if(clients) {
      // grab the object containing a list of current connected clients in 'wait-queue'
      const currentClients = Object.keys(Object.entries(clients)[0][1])

      // grab the first client in the list
      const firstClient = currentClients.splice(0, currentClients.length)[0];
      console.log('current client: ', socket.id , ' | other client: ', firstClient);

      if (socket.id !== firstClient) {
        socket.join(firstClient);
        io.to(socket.id).emit('start-game', firstClient);
        
        // io.in(firstClient).clients((err , clients) => {
        //   console.log(clients);
        //   // clients will be array of socket ids , currently available in given room
        // });

        io.to(firstClient).emit('remove-from-queue-and-start-game', socket.id);
      }

    } else {
      console.log('waiting for more users')
      socket.join('wait-queue');
    }

  })

  // Disconnect socket if the user exits the game
  socket.on('disconnect', () => {
    console.log('disconnected');
  })
})

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
server.listen(API_PORT, () => console.log(`Server is listening on port ${API_PORT}`));