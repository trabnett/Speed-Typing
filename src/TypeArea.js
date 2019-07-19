import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class TypeArea extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            textArea: ""
        }
    }
    handleChange = (e) => {
        e.target.value === this.props.word && !this.props.timeup ? this.props.handleScore() : console.log("hell0")
        this.setState({textArea: e.target.value})
        console.log(e.target.value)
    }
    render(){
        return(
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter your </Form.Label>
                    <Form.Control value={this.state.textArea} onChange={this.handleChange} type="Text" placeholder="Type in the word!" />
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.props.timeup ? this.props.restart : this.props.handleScore}>
                    {this.props.timeup ? "Restart" : "Submit"}
                </Button>
            </Form>
        )
    }
}

export default TypeArea;