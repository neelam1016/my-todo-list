import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AddCard from './Components/AddCard';

function App() {
  return (
    <Router>
    <div>
      <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/updatetodo/:id' element={<AddCard/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
