import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Provider } from 'react-redux';
// import store from './store';
import Game from './components/game'
// import Header from './components/header'

function App() {
  

  return (
    <div className="App">
      {/* <Provider store={store}> */}
        <header >
          {/* <Header /> */}
          <Game />
        </header>
      {/* </Provider> */}
    </div>
  );
}

export default App;
