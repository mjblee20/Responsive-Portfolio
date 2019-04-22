module.exports = function(app) {

    // Routes
    app.get("/", function(req, res) {
        res.render("index", {aboutme: true})
    })
    // POST route for saving a new Book to the db and associating it with a Library
    app.post("/submit", function(req, res) {
        // Create a new Book in the database
        db.Book.create(req.body)
        .then(function(dbBook) {
            // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
            // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Library.findOneAndUpdate({}, { $push: { books: dbBook._id } }, { new: true });
        })
        .then(function(dbLibrary) {
            // If the Library was updated successfully, send it back to the client
            res.json(dbLibrary);
        })
        .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
    });
    
    // Route for getting all books from the db
    app.get("/index", function(req, res) {
        res.render("index", {aboutme: true})
    });
    
    // Route for getting all libraries from the db
    app.get("/contact", function(req, res) {
        res.render("index", {contact: true})
    });
    
    // Route to see what library looks like WITH populating
    app.get("/portfolio", function(req, res) {
        res.render("index", {portfolio: true})
    });
}