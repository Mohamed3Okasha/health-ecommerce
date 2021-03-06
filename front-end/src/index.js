import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

import App from './components/app';

// import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/style.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
    <CookiesProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CookiesProvider>
    );