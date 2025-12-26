import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AddressProvider } from './Context/AddressContext.jsx';
import AddressProviderInput from './Context/Address.input.context.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AddressProvider>
        <AddressProviderInput>
          <App />
        </AddressProviderInput>
      </AddressProvider>
    </BrowserRouter>
  </StrictMode>
);
