import React, { Component, useEffect, useRef } from 'react';
import { Container, InputGroup, Row, FormControl, Col } from 'react-bootstrap';
import { auth } from 'firebase/firebase-auth';
import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };


const FirestoreCollection = (props) => {
	const [ value, loading, error ] = useCollection(
		firebase.firestore().collection(props.country ? `chat${props.country}` : 'chat').orderBy('timeStamp', 'asc'),
		{
			snapshotListenOptions: { includeMetadataChanges: true }
		}
	);
	return (
		<div>
			<div>
				{error && <strong>Error: {JSON.stringify(error)}</strong>}
				{loading && <span className="text-light">Collection: Loading...</span>}
				{value && (
					<div>
						{value.docs.map((doc) => (
							<div
								className={
									props.user === doc.data().writer ? (
										'width-50 bg-success rounded pr-2 pl-2 text-light text-left'
									) : (
										'width-50 bg-primary rounded pl-2 pr-2 text-light text-left'
									)
								}
							>
								<p key={doc.id}>
									<span>
										<span className="handle">{doc.data().writer}</span>:{' '}
										<span>{doc.data().message} </span>
									</span>
								</p>
							</div>
						))}
                        <AlwaysScrollToBottom />
					</div>
				)}
			</div>
		</div>
	);
};

export class ChatRoom extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: auth,
			room: '',
			message: '',
			messages: [],
			members: '',
			countrySelect: '',
			country: false,
			chats: []
		};
	}

	

	componentDidMount = () => {
		this.loadMessages();
	};



	loadCountrySpecific = () => {
		const db = firebase.firestore();
		let messages = [];
		let param = this.state.countrySelect;
		db
			.collection(`chat${param}`)
			.orderBy('timeStamp', 'asc')
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					messages.push({
						key: doc.id,
						message: doc.data()
					});
				});
			})
			.then(() => {
				this.setState({
					messages: messages,
					country: true
				});
			});
	};

	loadMessages = () => {
		let messages = [];
		const db = firebase.firestore();
		db
			.collection('chat')
			.orderBy('timeStamp', 'asc')
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					messages.push({
						key: doc.id,
						message: doc.data()
					});
				});
			})
			.then(() => {
				this.setState({
					messages: messages
				});
			});
	};

	drawMessages = () => {
        return <FirestoreCollection country={this.state.countrySelect} user={this.props.user} />;
	};
	// input
	messageChange = (event) => {
		this.setState({
			message: event.target.value
		});
	};
	// Input
	countrySelectChange = (event) => {
		this.setState({
			countrySelect: event.target.value
		});
	};
	// // loads country chat on enter
	// handleKeyPressCountrySelect = (event) => {
	// 	if (event.key === 'Enter') {
	// 		console.log('enter press here! ');
	// 		this.loadCountrySpecific();
	// 	}
	// };
	// sends mesage to country chat ON ENTER
	handleSendKeyPressCountrySelect = (event) => {
		if (event.key === 'Enter') {
			console.log('enter press here! ');
			this.handleSendCountrySpecific();
		}
	};
	// sends message to country chat
	handleSendCountrySpecific = () => {
		const param = this.state.countrySelect;
		const db = firebase.firestore();

		db
			.collection(`chat${param}`)
			.doc()
			.set({
				message: this.state.message,
				writer: this.props.user,
				timeStamp: firebase.firestore.Timestamp.now()
			})
			.then(() => {
				this.setState({
					message: ''
				});
				this.loadCountrySpecific();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// handles send on ENTER
	handleKeyPressSend = (event) => {
		if (event.key === 'Enter') {
			console.log('enter press here! ');
			this.handleSend();
		}
	};
	// sends message to chat
	handleSend = () => {
		const db = firebase.firestore();
		console.log(this.state.message);
		db
			.collection('chat')
			.doc()
			.set({
				message: this.state.message,
				writer: this.props.user,
				timeStamp: firebase.firestore.Timestamp.now()
			})
			.then(() => {
				this.setState({
					message: ''
				});
				this.loadMessages();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div>
				<Container>
					<Row>
						<h1>Travel Chat</h1>
					</Row>
					<Row className="inputBox">
						<InputGroup className="mb-3">
							<FormControl
								onChange={this.countrySelectChange}
								value={this.state.countrySelect}
								placeholder="Country"
								aria-label="Country"
								onKeyPress={this.handleKeyPressCountrySelect}
								aria-describedby="basic-addon2"
							/>
							{/* <InputGroup.Append>
								<InputGroup.Text id="basic-addon2" onClick={this.loadCountrySpecific}>
									Select Country to Explore
								</InputGroup.Text>
							</InputGroup.Append> */}
						</InputGroup>
					</Row>
					<Row className="chatBox bg-dark mb-5 pt-3 rounded">
						<Col>
							<div>{this.drawMessages()}</div>
							{/* <div><FirestoreCollection country={this.state.country}/></div> */}
							<div
                                className='anchor'
								style={{ float: 'left', clear: 'both' }}
								ref={(el) => {
									this.messagesEnd = el;
								}}
							/>
						</Col>
					</Row>
					<Row className="inputBox">
						<InputGroup className="mb-3">
							<FormControl
								onChange={this.messageChange}
								value={this.state.message}
								placeholder="Message"
								aria-label="Message"
								onKeyPress={
									this.state.countrySelect ? (
										this.handleSendKeyPressCountrySelect
									) : (
										this.handleKeyPressSend
									)
								}
								aria-describedby="basic-addon2"
							/>
							<InputGroup.Append>
								<InputGroup.Text
									id="basic-addon2"
									onClick={
										this.state.countrySelect ? this.handleSendCountrySpecific : this.handleSend
									}
								>
									Send
								</InputGroup.Text>
							</InputGroup.Append>
						</InputGroup>
					</Row>
				</Container>
			</div>
		);
	}
}

export default ChatRoom;
