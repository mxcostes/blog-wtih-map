const router = require('express').Router();
let Post = require('../models/post.model');



router.route('/').get((req, res) => {
	Post.find()
	.then((posts) => res.json(posts))
	.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const userName = req.body.userName;
	const email = req.body.email;
	const title = req.body.title;
	const description = req.body.description;
	const location = req.body.location;
	const image = req.body.image;
	const date = Date.parse(req.body.date)

	const newPost = new Post({
		userName,
		email,
		title,
		description,
		location,
		image,
		date
	});
	newPost.save()
	.then(() => res.json('Post Added!')).catch((err) => res.status(400).json('Error: ' + err));
})
	 


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
			post.userName = req.body.userName;
			post.email = req.body.email;
			post.title = req.body.title;
			post.description = req.body.description;
			post.location = req.body.location;
			post.image = req.body.image;
			post.date = Date.parse(req.body.date);

			post.save().then(() => res.json('Post updated!')).catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/find_user/:user').post((req, res)=> {
	Post.find({ userName: req.params.user})
	.then((posts) => res.json(posts))
	.catch((err) => res.status(400).json('Error: ' + err));
})



module.exports = router;
