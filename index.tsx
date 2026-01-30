// Import the React library to access core React features
import React from 'react';
// Import ReactDOM to handle rendering the React app into the DOM
import ReactDOM from 'react-dom/client';
// Import the main App component which serves as the root component
import App from './App';

// Retrieve the HTML element with the id 'root' where the app will be mounted
const rootElement = document.getElementById('root');

// Perform a safety check: ensure the root element actually exists in the HTML
if (!rootElement) {
  // If not found, throw an error to alert the developer
  throw new Error("Could not find root element to mount to");
}

// Create a React root using the retrieved DOM element
const root = ReactDOM.createRoot(rootElement);

// Render the application tree into the root
root.render(
  // React.StrictMode wraps the app to activate additional checks and warnings
  <React.StrictMode>
    {/* Render the main App component */}
    <App />
  </React.StrictMode>
);