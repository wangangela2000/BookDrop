
/*
 * GET home page.
 */
const Parse = require('parse/node');
const Textbook = Parse.Object.extend("Textbook");


exports.view = function(req, res){
  const query = new Parse.Query(Textbook);
  var search = req.query.search;

  function buildListings(results) {
    const listings = []

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
      console.log('Added listing: ' + object.id);
    }
  
    console.log('Number of listings: ' + listings.length);
      
    res.render('results', {
      'listings': listings
    });
    
  
  }

  console.log(typeof search);
  if (search == ""){
    search = "";
    query.find()
      .then(buildListings)
      .catch(function(error) {
        console.log('error! ' + error);
    });
  } else {
    serach = search.toLowerCase();
    console.log('searching for: ' + search)
    query.find()
    .then((results) => {
      // filter out results MANUALLY
      const filtered = []
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        // check each field, then return new array
        if (
          object.get('title').toLowerCase().includes(search) ||
          object.get('author').toLowerCase().includes(search) ||
          object.get('isbn').toLowerCase().includes(search) ||
          object.get('class').toLowerCase().includes(search)
          
        ) {
          // add this object to filtered
          filtered.push(object);
        }
      }
      return filtered;
    })
      .then(buildListings)
      .catch(function(error) {
        console.log('error! ' + error);
    });
  }
};
