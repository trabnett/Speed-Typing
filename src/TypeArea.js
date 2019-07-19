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
    // prevent form from submitting on enter
    void = (e) => {
        e.preventDefault()
    }
    handleChange = (e) => {
        console.log(e.keyCode)
        if (this.props.timeup){
            return this.setState({textArea: ""})
        }
        if (e.target.value === this.props.word && !this.props.timeup){
            return this.setState({textArea: ""}, () => this.props.handleScore())
        }
        this.setState({textArea: e.target.value})
    }
    render(){
        return(
            <Form onSubmit={(e) => this.void(e)}>
                <Form.Group controlId="formBasicEmail">
                    {!this.props.timeup ? <Form.Label>Type this word: <b>{this.props.word}</b></Form.Label> : <Form.Label className="text-danger">Time Up!</Form.Label>}
                    <Form.Control value={this.props.timeup ? "" : this.state.textArea} onChange={this.handleChange} type="Text" placeholder={this.props.timeup ? "Time Up!" : "Type in the word!"} />
                </Form.Group>
                {this.props.timeup ? <Button variant="primary" type="button" onClick={this.props.restart}>Restart</Button> : null}
            </Form>
        )
    }
}

export default TypeArea;