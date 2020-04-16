const router = require('express').Router();
let Post = require('../models/post.model');
// IMAGE UPLOAD CONFIGURATIOIN
const multer = require('multer')
const storage = multer.diskStorage({
	filename: function(req,file, callback) {
		callback(null, Date.now() + file.originalname)
	}
})
const imageFilter = function(req, file, cb) {
	// accept image files only
	
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
	return cb(new Error("Only image files area ccepted!"), false)
	} cb(null, true)
}
const upload = multer({
	storage: storage,
	fileFilter: imageFilter
})
const cloudinary = require('cloudinary')
cloudinary.config({
	cloud_name: "dmb9jlwal",
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET

})

router.route('/').get((req, res) => {
	Post.find().then((posts) => res.json(posts)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post( upload.single("image") ,(req, res) => {
	cloudinary.v2.uploader.upload(req.file.path, function(err, result) {

	if (err) {
		req.json(err.message);
	  }
	  req.body.uploadImage = result.secure_url;
	  
	  // add image's public_id to image object
	  req.body.imageId = result.public_id;
	  const username = req.body.username;
	const title = req.body.title;
	const description = req.body.description;
	const location = req.body.location;
	const image = req.body.image;
	const imageTitle = req.body.titleImage
	const uploadImage = req.body.uploadImage
	const date = Date.parse(req.body.date)

	const newPost = new Post({
		username,
		title,
		description,
		location,
		image,
		imageTitle,
		uploadImage,
		date
	});
	  Post.create(req.body, function(err, image) {
		if (err) {
		  res.json(err.message);
		  return res.redirect("/");
		}
	  });
	});
 
	
	;

	

	newPost.save().then(() => res.json('Post added!')).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Post.findById(req.params.id).then((post) => res.json(post)).catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Post.findByIdAndDelete(req.params.id)
		.then(() => res.json('Post deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			post.username = req.body.username;
			post.title = req.body.title;
			post.description = req.body.description;
			post.location = req.body.location;
			post.image = req.body.image;
			post.date = Date.parse(req.body.date);

			post.save().then(() => res.json('Post updated!')).catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});



module.exports = router;
