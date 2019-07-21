import React from 'react';
import Card from 'react-bootstrap/Card';
import './App.css';

class CorrectWords extends React.Component{
    render(){
        return(
            <div className="text-center">
                <Card style={{ width: '40%' }}>
                    <Card.Header as="h5">Your Correct Words</Card.Header>
                    <Card.Body>
                        {this.props.words.map(function(word, idx){
                            return(
                                <p key={idx}>{word} &#10004;</p>
                            )
                        })}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CorrectWords;