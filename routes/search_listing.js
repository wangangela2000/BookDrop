
/*
 * search through listings
 */
const Parse = require('parse/node');
const Textbook = Parse.Object.extend("Textbook");
exports.view = function(req, res){
  res.render('search_listing', {});
};
