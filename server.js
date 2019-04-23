// dependencies/NPM packages
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./routes/api-routes")(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/myModel", { useNewUrlParser: true });

// When the server starts, create and save a new Library document to the db
// The "unique" rule in the Library model's schema will prevent duplicate libraries from being added to the server
db.myModel.create({ name: "myModel" })
  .then(function(dbMySpace) {
    // If saved successfully, print the new Library document to the console
    console.log(dbMySpace);
  })
  .catch(function(err) {
    // If an error occurs, print it to the console
    console.log(err.message);
  });


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
