import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ! is used to tell TypeScript that the value is not null
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

// StrictMode is a tool for highlighting potential problems in an application
// by rendering each component twice.
