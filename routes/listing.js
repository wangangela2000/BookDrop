/*
* GET listing info
*/

const Parse = require('parse/node');

exports.view = function(req, res){
    // need to display all the info for the stuff
    var Textbook = Parse.Object.extend("Textbook");
    var query = new Parse.Query(Textbook);

    query.count().then(count => {
        console.log(`ParseObjects found: ${count}`);
    })
    var titleToShow = req.params.bookTitle;
    var isbnToShow = req.params.bookIsbn;
    var classToShow = req.params.classToShow;
    var priceToShow = req.params.price;

    var sellerContact = req.params.sellerContact;
    var notes = req.params.seller;

    res.render("listing", {
        "title": titleToShow,
    });
};

// Text
