import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inputmahasiswa from './Components/Inputmahasiswa';
import Listmahasiswa from './Components/Listmahasiswa';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Login from './Components/Login';
import LoginModal from './Components/LoginModal';

class App extends Component {
  render() {
    return (
      <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input-data" element={<Inputmahasiswa />} />
          <Route path="list-mahasiswa" element={<Listmahasiswa />} />
          <Route path="login" element={<Login  />} />
          
        </Routes>
      </Router>
    </>
    );
  }
}

export default App;
