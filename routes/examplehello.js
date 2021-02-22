
/*
 * GET home page.
 */
exports.view = function(req, res){
  var nameToShow = req.params.userName;
  console.log("Name is" + nameToShow);

  res.render("hello", {
  	"name": nameToShow,
  });
};

