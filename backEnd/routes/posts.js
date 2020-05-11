const router = require('express').Router();
let Post = require('../models/post.model');


// gets all posts
router.route('/').get((req, res) => {
	Post.find()
	.then((posts) => res.json(posts))
	.catch((err) => res.status(400).json('Error: ' + err));
});


// creates new post
router.route('/add').post((req, res) => {
	const userName = req.body.userName;
	const email = req.body.email;
	const title = req.body.title;
	const description = req.body.description;
	const location = req.body.location;
	const lat = req.body.lat;
	const lon = req.body.lon;
	const country = req.body.country;
	const image = req.body.image;
	const date = Date.parse(req.body.date)

	const newPost = new Post({
		userName,
		email,
		title,
		description,
		location,
		lat,
		lon,
		country,
		image,
		date
	});
	newPost.save()
	.then(() => res.json('Post Added!')).catch((err) => res.status(400).json('Error: ' + err));
})
	 

// finds single post by ID
router.route('/:id').get((req, res) => {
	Post.findById(req.params.id).then((post) => res.json(post)).catch((err) => res.status(400).json('Error: ' + err));
});

// deletes post by id
router.route('/:id').delete((req, res) => {
	Post.findByIdAndDelete(req.params.id)
		.then(() => res.json('Post deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});


// updates post
router.route('/update/:id').post((req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			post.userName = req.body.userName;
			post.email = req.body.email;
			post.title = req.body.title;
			post.description = req.body.description;
			post.location = req.body.location;
			post.lat = req.body.lat;
			post.lon = req.body.lon;
			post.country = req.body.country;
			post.image = req.body.image;
			post.date = Date.parse(req.body.date);

			post.save().then(() => res.json('Post updated!')).catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

// fetches for single user info profile
router.route('/find_user/:user').post((req, res)=> {
	Post.find({ userName: req.params.user})
	.then((posts) => res.json(posts))
	.catch((err) => res.status(400).json('Error: ' + err));
})
// fetches author info may be redundant given it does the same thing as about
router.route('/check_out/:name').post((req,res)=> {
	const db = firebase.firestore();
        db.collection('posts').where("userName", '==', this.props.displayName)
        .get()
        .then(function(querySnapshot) {
			res.json(querySnapshot)
                
				})
				.catch((err)=> res.status(400))
            })
            
        
        


// find posts within a searhed country
router.route('/search/:search').post((req,res)=> {
	Post.find({country: " " + req.params.search})
	.then((posts)=> res.json(posts))
	.catch((err) => res.status(400).json('Error: ' + err))
	})

	// Post.find({country: " " + req.params.search})
	// .then(function(posts) {
	// 	if(posts){
	// 		res.json(posts)

	// 	} else {
	// 		Post.find({userName: req.params.search})
	// 		.then((posts)=> res.json(posts))
	// 	}
	// } )
	// 	.catch((err



module.exports = router;
