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
      countdown: 25,
      wordCount: 1,
      words: [],
      correctWords: [],
      top3: [],
      highscore: false,
      name: ""
    }
  }
  handleScore = () =>{
    this.setState({correctWords: [...this.state.correctWords, this.state.words[this.state.wordCount]]})
    this.setState({score: this.state.score + 1, wordCount: this.state.wordCount + 1})
  }
  restart = (event) => {
    event.preventDefault()
    this.setState({countdown: 25, score: 0, timeup: false, correctWords: []})
  }
  checkForHighScore = () =>{
    if (this.state.score >= this.state.top3["score3"]){
      this.setState({highscore: true})
    }
  }
  upDateJson = () => {
    fetch('https://api.myjson.com/bins/djj3t', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"top3": this.state.top3})
    })
    .then(res => res.text()) 
    .catch(function(error) {
      console.log(error);
    });
  }
  handleHighScore = (name) => {
    this.setState({name: name}, () => {
      if (this.state.score >= this.state.top3["score1"]){
        let newTop3 = {1: this.state.name, "score1": this.state.score, 2: this.state.top3[1], "score2": this.state.top3["score1"], 3: this.state.top3[2], "score3": this.state.top3["score2"]}
        return this.setState({top3: newTop3, highscore: false}, ()=> this.upDateJson())
      } else if (this.state.score >= this.state.top3["score2"]){
        let newTop3 = {1: this.state.top3[1], "score1": this.state.top3["score1"], 2: this.state.name, "score2": this.state.score, 3: this.state.top3[2], "score3": this.state.top3["score2"]}
        return this.setState({top3: newTop3, highscore: false}, ()=> this.upDateJson())
      } else {
        let newTop3 = {1: this.state.top3[1], "score1": this.state.top3["score1"], 2: this.state.top3[2], "score2": this.state.top3["score2"], 3: this.state.name, "score3": this.state.score}
        return this.setState({top3: newTop3, highscore: false}, ()=> this.upDateJson())
      }
    })
  }
  // countdown timer works by having a countdown timer fire this tick function once everysecond from the Timer component
  tick = () => {
    this.state.countdown > 0 ? this.setState({countdown: this.state.countdown - 1}) : this.setState({countdown: 0, timeup: true, wordCount: this.state.wordCount + 1}, () => this.checkForHighScore())
  }
  componentDidMount() {
    // fetch random words list
    // !!! important - api keys seem to expire quickly. A new one can be found at https://random-word-api.herokuapp.com/ and inserted into the URL below
    fetch('https://random-word-api.herokuapp.com/word?key=7AZY316Q&number=100', {mode: 'cors'}, {
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
      .then(res => res.json())
      .then(res => this.setState({top3: res['top3']}))
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  render(){
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
