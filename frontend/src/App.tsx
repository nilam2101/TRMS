import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './router.component';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <RouterComponent/>
    </BrowserRouter>
  </div>
    
  );
}

export default App;
