
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


myNewObject.set('author', req.query.fauthor);
myNewObject.set('title', req.query.ftitle);
myNewObject.set('isbn', req.query.fisbn);
myNewObject.set('class', req.query.fclass);
myNewObject.set('price', req.query.fprice);
myNewObject.set('condition', 'req.query.fcondi');
myNewObject.set('negotiable', 'No');
myNewObject.set('image', new Parse.File("resume.txt", { base64: btoa("My file content") }));
myNewObject.set('notes', 'req.query.fnot');

myNewObject.save().then(
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
