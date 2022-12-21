// creating a Wikipedia-like RESTful API

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
const articleSchema = {
  title: String,
  content: String
};

// we create our model based on the schema above
const Article = mongoose.model("Article", exampleSchema);

///////////////// Requests targeting ALL articles /////////////////////////////

app.route("/articles")
.get(function(req, res) {
  Article.find(function(err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  })
})

.post(function(req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err) {
    if (!err) {
      res.send("Article successfully added.");
    } else {
      res.send(err);
    }
  })
})

.delete(function(req, res) {
  Article.deleteMany(function(err) {
    if (!err) {
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  })
});

//////////////// Requests targeting a SPECIFIC article ////////////////////////

// note `.update()` is deprecated...

app.route("/articles/:articleTitle")
.get(function(req, res) {
  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
    if (!err) {
      res.send(foundArticle)
    } else {
      res.send("Sorry, we couldn't find an article with that title.")
    }
  });
})

.put(function(req, res) {
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set:{title: req.body.title, content: req.body.content}},
    {upsert: true},
    function(err) {
      if (!err) {
        res.send("Successfully updated article.")
      } else {
        console.log(err);
        res.send(err);
      }
    }
  )
})

.patch(function(req, res) {
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err) {
      if (!err) {
        res.send("Successfully updated article.")
      } else {
        console.log(err);
        res.send(err);
      }
    }
  )
})

.delete(function(req, res) {
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err) {
      if (!err) {
        res.send("Successfully deleted article.")
      } else {
        res.send(err)
      }
    }
  )
})


// For our reference vvvvvvv

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
