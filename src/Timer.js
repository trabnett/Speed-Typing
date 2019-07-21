import React from 'react';
import './App.css';

class Timer extends React.Component{
    componentDidMount(){
        setTimeout(
            function() {
                this.props.tick()
            }
            .bind(this),
            1000
        );
    }
    render(){
        return(
            <div className="text-center">
                <div className="timer">
                    {this.props.time}
                </div>
            </div>
        )
    }
}

export default Timer;