import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Giphy from './components/Giphy';

console.log(process.env.REACT_APP_GIPHY_API_KEY);

class App extends Component{
  render(){
    return (
      <div className="App">
        
        <Giphy/>
      </div>
    );
  }
 
  
}

export default App;
