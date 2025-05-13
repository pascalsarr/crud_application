import React from 'react';
import { Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import renderRoutes from './routes/routes';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {renderRoutes()}
      </Routes>
      <Footer />  
    </>
  );
}

export default App;
