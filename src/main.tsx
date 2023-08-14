import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
// import { ThemeProvider } from '@mui/material/styles';
import App from './App.tsx';
// import theme from './themes/themes';
import './index.scss'

// Use createRoot instead of ReactDOM.render
const root = document.getElementById('root');
if (root) {
  const rootElement = createRoot(root);
  rootElement.render(
    <React.StrictMode>
      {/* <ThemeProvider theme={theme}> */}
        <App />
      {/* </ThemeProvider> */}
    </React.StrictMode>
  );
}
