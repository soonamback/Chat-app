import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Join  from './components/Join/Join'
import Chat  from './components/Chat/Chat'

function App() {
  
  return (
    <div className="App">
    
    <Router>
      <Routes>
      
        <Route path="/" exact element={<Join />} />
        
        <Route path="/chat" exact element={<Chat />}  />
        
        </Routes> 
    </Router>
    </div>
  );
}

export default App;
