/*
* GET listing info
*/

const Parse = require('parse/node');
const Textbook = Parse.Object.extend("Textbook");

exports.view = function(req, res){
    // need to display all the info for the stuff
    var query = new Parse.Query(Textbook);

    query.count().then(count => {
        console.log(`ParseObjects found: ${count}`);
    })
    
    // read a Textbook object
    
    query.equalTo('exampleKey', 'exampleValue');
    query.find().then((results) => {
        // set the variables for res.render in here
        var titleToShow = "exampleTitle"; // set this to results, maybe use the attributes?
        var isbnToShow = req.params.bookIsbn;
        var classToShow = req.params.classToShow;
        var priceToShow = req.params.price;

        var sellerContact = req.params.sellerContact;
        var notes = req.params.seller;
    })

    titleToShow = "1";

    res.render("listing", {
        "title": titleToShow,
    });
};

// Text
