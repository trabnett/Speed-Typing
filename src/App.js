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
      countdown: 12,
      wordCount: 1,
      words: []
    }
  }
  handleScore = () =>{
    this.setState({score: this.state.score + 1, wordCount: this.state.wordCount + 1}, () => console.log(this.state.score))
  }
  restart = () => {
    console.log("restart")
    this.setState({countdown: 30, score: 0, timeup: false})
  }
  tick = () => {
    this.state.countdown > 0 ? this.setState({countdown: this.state.countdown - 1}, () => console.log(this.state.countdown)) : this.setState({countdown: 0, timeup: true})
  }
  componentDidMount() {
    fetch('https://random-word-api.herokuapp.com/word?key=A03EJMGY&number=20', {mode: 'cors'}, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json()) // OR res.json()
    .then(res => this.setState({words: res}, () => console.log("here it is", res)) )
    .catch(function(error) {
      console.log(error);
    });
  }
  render(){
    return (
      <div className="container">
        {this.state.timeup ? <p className="text-centered">time up</p> : <Timer key={this.state.countdown} tick={this.tick} time={this.state.countdown}/>}
        <div>
          {this.state.score}
        </div>
        <TypeArea handleScore={this.handleScore} restart={this.restart} word={this.state.words[this.state.wordCount]} timeup={this.state.timeup}/>
      </div>
    );
  }
}

export default App;
