import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';

class Highscore extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }
    submit = (e) => {
        e.preventDefault()
        this.props.handleHighScore(this.state.name)
    }
    handleChange = (e) => {
        this.setState({name: e.target.value}, () => console.log(this.state, "state in highscore"))
    }
    render(){
        return(
            <div className="text-center">
                <h1>Way to Go!</h1>
                <h3>You have joined our illustrious Hall Of Fame!</h3>
                <Form onSubmit={(e) => this.submit(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control onChange={this.handleChange} type="Text" placeholder="Type in the word!" />
                    </Form.Group>
                    <Button variant="primary" type="submit" >Enter the Hall of Fame!</Button>
                </Form>
            </div>
        )
    }
}

export default Highscore;