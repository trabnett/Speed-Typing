import React from 'react';
import Timer from './Timer';
import TypeArea from './TypeArea';
import Highscore from './Highscore';
import HOF from './HOF';
import Navbar from 'react-bootstrap/Navbar';
import CorrectWords from './CorrectWords';
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timeup: false,
      countdown: 12,
      wordCount: 1,
      words: [],
      correctWords: [],
      top3: [],
      highscore: false
    }
  }
  handleScore = () =>{
    this.setState({correctWords: [...this.state.correctWords, this.state.words[this.state.wordCount]]})
    this.setState({score: this.state.score + 1, wordCount: this.state.wordCount + 1}, () => console.log(this.state))
  }
  restart = (event) => {
    event.preventDefault()
    this.setState({countdown: 12, score: 0, timeup: false, correctWords: []})
  }
  checkForHighScore = () =>{
    if (this.state.score >= this.state.top3["score3"]){
      console.log('here we are in check for high score',this.state.top3["score3"])
    }
    return "hello"
  }
  handleHighScore = (name) => {
    console.log(name, this.state.score)
  }
  // countdown timer works by having a countdown timer fire this tick function once everysecond from the Timer component
  tick = () => {
    this.state.countdown > 0 ? this.setState({countdown: this.state.countdown - 1}) : this.setState({countdown: 0, timeup: true, wordCount: this.state.wordCount + 1})
  }
  componentDidMount() {
    // fetch random words list
    // !!! important - api keys seem to expire quickly. A new one can be found at https://random-word-api.herokuapp.com/ and inserted into the URL below
    fetch('https://random-word-api.herokuapp.com/word?key=7AZY316Q&number=20', {mode: 'cors'}, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(res => {
      this.setState({words: res}) 
      fetch('https://api.myjson.com/bins/djj3t', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json()) // OR res.json()
      .then(res => this.setState({top3: res['top3']}, () => console.log(this.state.top3[1])))
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  render(){
    if (this.state.timeup){
      this.checkForHighScore()
    }
    return (
      <div>
        <Navbar bg="dark navbar"><div className="pin"><div className="title">Typepocolypse:</div><div className="subtitle"> The Most Challenging Typing Test on the Internet</div></div></Navbar>
        <div className="container">
          <div className="text-center title">
            Score: {this.state.score}
          </div>
          {this.state.highscore ? <Highscore handleHighScore={this.handleHighScore}/> : null}
          <TypeArea handleScore={this.handleScore} restart={this.restart} word={this.state.words[this.state.wordCount]} timeup={this.state.timeup}/>
          {this.state.timeup ? <p className="text-center text-danger">Time Up</p> : <Timer key={this.state.countdown} tick={this.tick} time={this.state.countdown}/>}
        </div>
        <CorrectWords words={this.state.correctWords}/>
        <HOF top3={this.state.top3}/>
      </div>
    );
  }
}

export default App;
