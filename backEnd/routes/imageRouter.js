const router = require('express').Router();
let Image = require('../models/image.model');



router.route("/").get((req, res) => {
	Image.find(function(err, images) {
	  if (err) {
		res.json(err.message);
	  } else {
		res.json(images);
	  }
	});
  });
  
//   router.route("/add").post, upload.single("image"), (req, res) => {

  router.route("/add").post((req, res) => {
	cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
	  if (err) {
		req.json(err.message);
	  }
	  req.body.image = result.secure_url;
	  // add image's public_id to image object
	  req.body.imageId = result.public_id;
  
	  Image.create(req.body, function(err, image) {
		if (err) {
		  res.json(err.message);
		  return res.redirect("/");
		}
	  });
	});
  });

module.exports = router;