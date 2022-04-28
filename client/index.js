import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

// uncomment so that webpack can bundle styles
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans&display=swap');
import styles from './styles.scss';

render(<App />, document.getElementById('root'));

// "dev": "concurrently \"cross-env NODE_ENV=development webpack serve --open\" \"cross-env NODE_ENV=development nodemon server/server.js\""
