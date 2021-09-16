import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Questionnaire from './components/Questionnaire';
import Home from './containers/Home';

function App() {
  return (
    
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
