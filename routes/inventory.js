
/*
 * GET home page.
 */
const Parse = require('parse/node');
const Textbook = Parse.Object.extend('Textbook');

function renderListings(req, res){
  const current = Parse.User.current();
  var userId = '';
  if (current) {
    console.log('current user id: ' + current.id);
    userId = current.id;
  } else {
    console.log('no one is logged in D:');
  } 

  const query = new Parse.Query(Textbook);
  const listings = []

  query.find()
    .then(function(results) {
      console.log("Successfully retrieved " + results.length + " listings.");
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        const newListing = {
          "ownerId": userId,
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
}

exports.view = renderListings;

exports.delete = function(req, res){
  var query = new Parse.Query(Textbook);
  const id = req.params.id;
  query.get(id).then((object) => {
    object.destroy().then((response) => {
      console.log('Deleted ParseObject', response);
    }, (error) => {
      console.error('Error while deleting ParseObject', error);
    }).then((response) => {
      renderListings(req, res);
    });
  }).catch(function(error) {
    console.log(error);
    renderListings(req, res);
  });  
}

exports.add = function(req, res) {
  var newListing = new Textbook();
  // set values using req
  // example:
  // newListing.set("title", req.params.title);
  var price = req.body.fprice;
  price.replace("$", "");

  newListing.set('author', req.body.fauthor);
  newListing.set('title', req.body.ftitle);
  newListing.set('isbn', req.body.fisbn);
  newListing.set('class', req.body.fclass);
  newListing.set('price', req.body.fprice);
  newListing.set('condition', req.body.fcondition);
  newListing.set('negotiable', "$" + price);
  newListing.set('contact', req.body.fcontact);
  //newListing.set('image', new Parse.File("resume.txt");
  newListing.set('notes', req.body.fnotes);

  newListing.save().then(
    (result) => {
      if (typeof document !== 'undefined') document.write(`Textbook created: ${JSON.stringify(result)}`);
      console.log('Textbook created', result);
    },
    (error) => {
      if (typeof document !== 'undefined') document.write(`Error while creating Textbook: ${JSON.stringify(error)}`);
      console.error('Error while creating Textbook: ', error);
    }
  ).then(
    (result) => {
      renderListings(req, res);
    },
    (error) => {
      renderListings(req, res);
    }
  );
}