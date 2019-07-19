import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class TypeArea extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter your </Form.Label>
                    <Form.Control type="Text" placeholder="Type in the word!" />
                    <Form.Text className="text-muted">
                    Enter your word here.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.props.handleScore}>
                    Submit
                </Button>
            </Form>
        )
    }
}

export default TypeArea;