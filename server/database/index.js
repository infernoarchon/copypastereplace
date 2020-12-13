//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port
const uri = process.env.MONGODB_URI || 'mongodb+srv://heroku_h9gfj9xr:nJdUC4mPE0Ubnmf5@cluster-h9gfj9xr.pjujg.mongodb.net/heroku_h9gfj9xr?retryWrites=true&w=majority' 

mongoose.connect(uri, {autoIndex: false}).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );


module.exports = mongoose.connection