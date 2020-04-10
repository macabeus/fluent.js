import React from 'react';
import ReactDOM from 'react-dom';
import { LocalizationProvider } from 'fluent-react/compat';

import generateBundles from './l10n';
import App from './App';

console.log('React version on my project:', React.version)

ReactDOM.render(
  <LocalizationProvider l10n={generateBundles(navigator.languages)}>
    <App />
  </LocalizationProvider>,
  document.getElementById('root')
);
