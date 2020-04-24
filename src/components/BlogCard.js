import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import {Link } from 'react-router-dom'



const CardMaker=(props) => ( 
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={props.posts.image} />
<Card.Body>
<Card.Title>{props.posts.title}</Card.Title>
  <Card.Text>
    Some quick example text to build on the card title and make up the bulk of
    the card's content.
  </Card.Text>
  <Link to={'/postpage/' + props.posts._id}><Button>Go to Post</Button></Link>
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

    componentDidMount() {

    }

    cardList = () => {
		return this.props.posts.map((currentPost) => {
			return <CardMaker posts={currentPost}  key={currentPost._id} />;
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
