
/*
 * GET home page.
 */
const Parse = require('parse/node');
const Textbook = Parse.Object.extend('Textbook');

exports.view = function(req, res){
  const query = new Parse.Query(Textbook);
  const listings = []

  query.find()
    .then(function(results) {
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
        console.log('Added listing: ' + object.get('title'));
      }

      console.log('Number of listings: ' + listings.length);
        
      res.render('inventory', {
        'listings': listings
      });
    })
    .catch(function(error) {
      console.log('error! ' + error);
    });
};