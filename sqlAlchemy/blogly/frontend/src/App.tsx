import React from 'react';
import './App.css';
import Form from './Form';
import Users from './Users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/users' element={<Users/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
