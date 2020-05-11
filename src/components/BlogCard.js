import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import {Link } from 'react-router-dom'



const CardMaker=(props) => ( 
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={props.posts.postimage} />
<Card.Body>
<Card.Title>{props.posts.post.title}</Card.Title>
  <Card.Text>
    Some quick example text to build on the card title and make up the bulk of
    the card's content.
  </Card.Text>
  <Link to={'/postpage/' + props.posts.key}><Button>Go to Post</Button></Link>
</Card.Body>
</Card>
)

export class BlogCard extends Component {
    constructor(props){ 
    super(props)

        this.state = {
            posts: []
        }

    }

   

    cardList = () => {
		return this.props.posts.map((currentPost) => {
			return <CardMaker posts={currentPost}  key={currentPost.key} />;
		});
    };
    

    render() {
        return (
            <div>
                {this.cardList()}
            </div>
        )
    }
}

export default BlogCard
