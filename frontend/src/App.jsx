import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Route in addition to Routes
import Home from './components/banner';
import Signup from './components/Signup';
import Login from './components/login';
import Contact from './components/contact/contact';
import Uploadus from './components/upload';
import Preview from './components/datadisplay';
import Frauddetection from './components/frauddetection/UPIFraudDetection';
import PredictionResult from './components/result/PredictionResult';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Final from './components/final'
import Analysis from './components/Analysis';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/upload" element={<Uploadus />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/detect" element={<Frauddetection />} />
        <Route path="/result" element={<PredictionResult/>} />
        <Route path="/final" element={<Final />} />
        <Route path="/analysis" element={<Analysis />} />

     
      </Routes>
<Footer />
    </>
  );
}

export default App;
