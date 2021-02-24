
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

  res.render('add_listing', {});
};
