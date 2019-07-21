import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './App.css';

class HOF extends React.Component{
    render(){
        return(
            <div className="text-center">
                <Card style={{ width: "40%" }}>
                    <Card.Header as="h5">Hall Of Fame</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="text-left">{this.props.top3[1]}: {this.props.top3['score1']}</ListGroup.Item>
                        <ListGroup.Item className="text-left">{this.props.top3[2]}: {this.props.top3['score2']}</ListGroup.Item>
                        <ListGroup.Item className="text-left">{this.props.top3[3]}: {this.props.top3['score3']}</ListGroup.Item>
                    </ListGroup>                  
                </Card>
            </div>
        )
    }
}

export default HOF;