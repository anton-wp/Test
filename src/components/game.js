import React, { Component } from 'react';
import { getLevel, getWinners, addWinner } from '../helpers/api/game';
// import { connect } from 'react-redux';
// import { SetCategoryListThunk, blockBlue } from '../action/actionCreator';
// import logo from './logo.svg';
// import './App.css';

class Game extends Component {
  state = {
    name: '',
    nameUser: '', 
    level: '',
    levelBlock: [],
    titleLevel: [],
    winner: '',
    winners: [],
    timerIdBlue: '',
    blocks: [],
    field: 0,
    play: false,
    button: 'PLAY'
  };
  
  componentDidMount() {
    getLevel().then(data =>
      this.setState({
        levelBlock: data,
        titleLevel: Object.keys(data),
      })
    )    
    getWinners().then(data =>
      this.setState({
        winners: data,
      })
    )    
  }
  componentDidUpdate(){
    if(this.state.field){
      let green = this.state.blocks.filter((block) => block.className === 'block block-green');
      let red = this.state.blocks.filter((block) => block.className === 'block block-red');
      let lengthBlock = this.state.blocks.length/2
      if((green.length > lengthBlock || red.length > lengthBlock) || (green.length === lengthBlock && red.length === lengthBlock)) {
        clearInterval(this.state.timerIdBlue);
        if(this.state.winner === ''){
          this.gameOver();
        }
      }
    }
  }
  handleChange = ({target: {value} }) => {
    this.setState({
      name: value,
    })
  }
  handleChangeSelect = ({target: {value} }) => {
    this.setState({
      level: value,
    })
  }

  gameOver = () => {
    let green = this.state.blocks.filter((block) => block.className === 'block block-green');
    let red = this.state.blocks.filter((block) => block.className === 'block block-red');
    let winner 
    if(green.length > this.state.blocks.length/2) {
      winner = this.state.nameUser;
      this.setState({
        winner: this.state.nameUser ,
        play: false,
        button: 'PLAY AGAIN',
        blocks: [],
        field: 0,
      })
    }
    if(red.length > this.state.blocks.length/2){
      this.setState({
        winner: 'Computer',
        play: false,
        button: 'PLAY AGAIN',
        blocks: [],
        field: 0,
      })
      winner = 'Computer';
    }
    if((green.length && red.length) === this.state.blocks.length/2) {
      this.setState({
        winner: 'Вraw',
        play: false,
        button: 'PLAY AGAIN',
        blocks: [],
        field: 0,
      })
      winner = 'Вraw';
    }
    // (
    //   async () => {
    //     const winners = await addWinner(winner, Date());
    //     this.setState({
    //       winners,
    //     })
    //   }
    // )()
  }

  getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  blue = (delay) => {
    let BlockInGame = this.state.blocks.filter((block) => block.className === 'block');
    let randomBlock = BlockInGame[this.getRandomInRange(0, BlockInGame.length-1)]
    this.setState(prevState => ({
      blocks: prevState.blocks.map(
        el => el.key === randomBlock.key ? { ...el, className: 'block block-blue' } : el
      )
    }))
    setTimeout(() => this.red(), delay);
  }
  
  red = () => {
    this.setState(prevState => ({
      blocks: prevState.blocks.map(
        el => el.className === 'block block-blue' ? { ...el, className: 'block block-red' } : el
      )
    }))
  }
  
  green = (key) => {
    if(this.state.blocks[key - 1].className === 'block block-blue') {
      this.setState(prevState => ({
        blocks: prevState.blocks.map(
          el => el.key === key ? { ...el, className: 'block block-green' } : el
        )
      }))
    }
  }
  
  blockAdd = (level) => {
    let i = level ** 2;
    for(let j = 1; j < i + 1 ; j++){
      this.setState(prevState => ({ blocks: prevState.blocks.concat([{key: j,  className: 'block',}])}))
    }
  }
  
  click = () => {
    if(!this.state.play){
      this.setState({
        play: true
      })
      if(this.state.name) {
        this.setState({
          nameUser: this.state.name,
          name: '',
        })
        let key
        if(this.state.level){
          key = this.state.level;
        }else {
          key = this.state.titleLevel[0];
        }
        this.setState({
          field: this.state.levelBlock[key].field,
          winner: '',
        })
        this.blockAdd(this.state.levelBlock[key].field)
        let delay =  this.state.levelBlock[key].delay;
        this.setState({
          timerIdBlue: setInterval(() => this.blue(delay), (delay + 1000))
        })
      }   
    } 
  }

  
  

  render() { 
    let i = this.state.field * 84;
    let j = this.state.field * 84;
    return (
      <div className='head'>
        <p style={{display: 'contents'}}>Level</p>
        <select className='headForm' placeholder="123" onChange={this.handleChangeSelect}>
          {this.state.titleLevel.map((element) => (
            <option key={element}>{element}</option>
          ))}
        </select>
        <input className='headForm' placeholder='Enter your name' 
        onChange={this.handleChange}
        type='text'
        value={this.state.name}/>
        <button className='headForm' onClick={this.click}>{this.state.button}</button>  
        <div>
          <h2>{this.state.winner}</h2>
          <div className="Game App-header" style={{ width: i, height: j}} >
            {this.state.blocks.map((block) => (
              <div key={block.key} onClick={() => this.green(block.key)} className={block.className}></div>
            ))}
          </div>
        </div>
        <div className='winners'>
          <ul >
            {this.state.winners.map((block) => (
              <li key={block.id} >
                <h3>{block.winner}</h3>
                <h5>{block.date}</h5>
              </li>
            ))}
          </ul>
        </div>
      </div>  
    );
  }
}

export default (Game);