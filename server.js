require("dotenv").config()
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const dbConnection = require('./server/database')
const passport = require('./server/passport')
const user = require('./server/routes/user')
const api = require('./server/routes/api')

const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}





app.use(
  session({
    secret: 'doodle-bird',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
)



app.use(passport.initialize())
app.use(passport.session())

app.use('/user',user)
app.use('/api', api)


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
});
