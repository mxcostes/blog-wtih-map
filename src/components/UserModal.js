function UserLoginModal(props) {
    return (
        <Form >
            <div style={{ color: props.displayColor }} id="login-status">{props.display}</div>
            <Button className="modal-button" variant="outline-primary" onClick={props.logOut}>
                Log Out
                </Button>
            <Button className="modal-button" variant="secondary" onClick={props.resetPassword}>
                Reset Password
                </Button>
            <Button className="modal-button" variant="outline-secondary" onClick={props.changeEmail}>
                Change Email
                </Button>
        </Form>
    )


