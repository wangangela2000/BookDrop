
/*
 * GET home page.
 */
const Parse = require('parse/node');
const Textbook = Parse.Object.extend("Textbook");


exports.view = function(req, res){
  const query = new Parse.Query(Textbook);

  function buildListings(results) {
    const listings = []
  
    console.log("Successfully retrieved " + results.length + " listings.");
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      const newListing = {
        "title" : object.get('title'),
        "author" : object.get('author'),
        "price" : object.get('price'),
        "class" : object.get('class'),
        "id" : object.id
      }
      listings.push(newListing);
      console.log('Added listing: ' + object.get('id'));
    }
  
    console.log('Number of listings: ' + listings.length);
      
    res.render('results', {
      'listings': listings
    });
    
  
  }

  var search = req.query.search;
  console.log(typeof search);
  if (search == ""){
    search = " ";
    query.find()
      .then(buildListings)
      .catch(function(error) {
        console.log('error! ' + error);
    });
  } else {
    query.fullText('author', search);
    query.fullText('title', search);
    query.fullText('isbn', search);
    query.fullText('class', search);

    query.find()
      .then(buildListings)
      .catch(function(error) {
        console.log('error! ' + error);
    });
  }

  
};
