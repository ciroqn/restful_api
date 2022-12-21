

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

// our templating engine
app.set('view engine', 'ejs');

// use body-parser to parse requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// set up mongodb database where end of url is name of db
mongoose.connect("mongodb://localhost:27017/DATABASE_NAME");

// create schema for our collection called 'articles'
const exampleSchema = {
  title: String,
  content: String
};

// we create our model based on the schema above
const ModelName = mongoose.model("CollectionName", exampleSchema);
