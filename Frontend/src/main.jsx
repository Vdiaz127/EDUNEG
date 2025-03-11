import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from "./components/context/UserContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Envuelve la aplicación con UserProvider */}
      <App />
    </UserProvider>
  </StrictMode>,
);