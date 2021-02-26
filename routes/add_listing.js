
/*
 * GET home page.
 */
const Parse = require('parse/node');
const Textbook = Parse.Object.extend("Textbook");

exports.view = function(req, res){
  var newListing = new Textbook();

  // set values using req
  // example:
  // newListing.set("title", req.params.title);
  newListing.set('author', req.query.fauthor);
  newListing.set('title', req.query.ftitle);
  newListing.set('isbn', req.query.fisbn);
  newListing.set('class', req.query.fclass);
  newListing.set('price', req.query.fprice);
  newListing.set('condition', req.query.fcondition);
  newListing.set('negotiable', req.query.fprice);
  newListing.set('contact', req.query.fcontact);
  //newListing.set('image', new Parse.File("resume.txt");
  newListing.set('notes', req.query.fnotes);

  newListing.save().then(
    (result) => {
      if (typeof document !== 'undefined') document.write(`Textbook created: ${JSON.stringify(result)}`);
      console.log('Textbook created', result);
    },
    (error) => {
      if (typeof document !== 'undefined') document.write(`Error while creating Textbook: ${JSON.stringify(error)}`);
      console.error('Error while creating Textbook: ', error);
    }
  );

  res.render('add_listing', {});
};
