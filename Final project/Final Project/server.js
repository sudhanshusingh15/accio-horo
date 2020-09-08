const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const axios = require('axios');

var admin = require("firebase-admin");

const baseUrl = "http://horoscope-api.herokuapp.com/horoscope";

var serviceAccount = require("serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://horo-lol.firebaseio.com"
});

const PORT = process.env.PORT || 3000;
const app = express();
const db = admin.firestore();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '/views/signup.html');
});

app.get('/profile', function(req, res) {
  res.sendFile(__dirname + '/views/profile.html');
});

app.get('/find', function(req, res) {
  let sign = req.query.sign;
  let day = req.query.day;
  console.log(baseUrl + sign + day);
  axios.get(`${baseUrl}/${day}/${sign}`).then(function(response) {
    res.status(200).json(response.data);
  }).catch(function(error) {
    console.log("error:destination not found");
    console.log(error);
    res.send(error);
  });
});


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
