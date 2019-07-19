import React from 'react';
import Timer from './Timer';
import TypeArea from './TypeArea';
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timeup: false,
      countdown: 12
    }
  }
  handleScore = () =>{
    this.setState({score: this.state.score + 1}, () => console.log(this.state.score))
  }
  tick = () => {
    this.state.countdown > 0 ? this.setState({countdown: this.state.countdown - 1}, () => console.log(this.state.countdown)) : this.setState({countdown: 0, timeup: true})
  }

  render(){
    return (
      <div className="container">
        {this.state.timeup ? <p>time up</p> : null}
        <Timer key={this.state.countdown} tick={this.tick} time={this.state.countdown}/>
        <div>
          {this.state.score}
        </div>
        <TypeArea handleScore={this.handleScore}/>
      </div>
    );
  }
}

export default App;
