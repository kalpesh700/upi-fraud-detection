import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for createRoot
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'; // Import your App component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <div >
    <App />
    </div>
     
    </BrowserRouter>
  </StrictMode>
);
