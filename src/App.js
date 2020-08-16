import React from 'react';
import { Home } from './components'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1 style={{
            'marginTop': '5%'
        }}>
            MGX UNISWAP EXCHANGE!
        </h1>
      <Home/>
    </div>
  );
}

export default App;
