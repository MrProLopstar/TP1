import 'core-js/es/map.js';
import 'core-js/es/set.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App.js';
const theme = createTheme();

ReactDOM.render(<ThemeProvider theme={theme}><App/></ThemeProvider>, document.getElementById('root'));
