import React from 'react';
import ReactDOM from 'react-dom';
import { FocusStyleManager } from "@blueprintjs/core";
import App from './components/App.jsx';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import './main.css';

FocusStyleManager.onlyShowFocusOnTabs();
ReactDOM.render(React.createElement(App), document.getElementById('root'));

