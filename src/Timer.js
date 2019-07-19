import React from 'react';


class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            time: 30
        }
    }
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
            <div className="text-center">{this.props.time}</div>
        )
    }
}

export default Timer;