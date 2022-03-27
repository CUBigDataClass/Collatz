import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import './index.css';
import {Support, WhatCollatz} from "./containers";


ReactDOM.render(
    <Router>
                 <Routes>
                     <Route path="/" element={<App />} />
                     <Route path="/whatiscollatz" element={<WhatCollatz />} />
                     <Route path="/support" element={<Support />} />

                 </Routes>
             </Router>,
    document.getElementById('root'));