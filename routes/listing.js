/*
* GET listing info
*/

const Parse = require('parse/node');
const Textbook = Parse.Object.extend("Textbook");

exports.view = function(req, res){
    // need to display all the info for the stuff
    var query = new Parse.Query(Textbook);
    const id = req.params.id;    
    console.log("ID is: " + id);
    // read a Textbook object
    query.get(id).then((obj) => {
        // set the variables for res.render in here

        res.render("listing", {
            "author": obj.get('author'),
            "title": obj.get('title'),
            "isbn": obj.get('isbn'),
            "class": obj.get('class'),
            "price": obj.get('price'),
            "condition": obj.get('condition'),
            "negotiable": obj.get('negotiable'),
            "notes": obj.get('notes'),
        });
    })
    
};

// Text
