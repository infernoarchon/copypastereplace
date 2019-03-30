import axios from "axios";
require('dotenv').config()

export default {
  // Gets all books
  getStories: function() {
    return axios.get("/api/latest");
  },

  getStory: function(id) {
    return axios.get("/api/story/" + id);
  },
  getPopular: function() {
    return axios.get("/api/popular");
  },

  getUserStories: function(user) {
    return axios.get("/api/stories/" + user)
  },

  getUserInfo: function(user) {
    return axios.get("/user/info/" + user)
  },
  // searchBooks: function(query) {
  //   return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query+ "&key=");
  // },
  // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // },
  sendText: function(text) {
    return axios.post("https://language.googleapis.com/v1/documents:annotateText?key=" + process.env.REACT_APP_GOOGLE_API_KEY, {
      document: text.document,
      features: { extractSyntax: true, extractEntities: true },
      encodingType: "UTF8"
    })
  },

  searchOMDB: function(query) {
    return axios.get("http://www.omdbapi.com/?apikey=" + process.env.REACT_APP_OMDB_API_KEY  + "&t=" + query + "&plot=full")
  },

  searchBooks: function(query) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=" + process.env.REACT_APP_GOOGLE_BOOKS_API_KEY)
  },
  
  sendTextToSpeech: function(text) {
    return axios.post("https://texttospeech.googleapis.com/v1/text:synthesize?key=" + process.env.REACT_APP_GOOGLE_API_KEY, {
      input: {text: text},
      voice: {languageCode: "en-GB", name: "en-GB-Wavenet-D"},
      audioConfig: {audioEncoding: "MP3"}
    })
  },
  getBio: function(key, user) {
    return axios.get("http://api.icndb.com/jokes/" + key + "?firstName=user&lastName=" + user )
  },

  getGifs: function(ent1, ent2) {
    console.log(process.env)
    return axios.get("https://api.giphy.com/v1/gifs/search?q=" + ent1 + "+" + ent2 + "&api_key=" + process.env.REACT_APP_GIPHY_API_KEY)
  }


};
