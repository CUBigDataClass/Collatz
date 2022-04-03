import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import './index.css';
import {Signin, Signup, WhatCollatz} from "./containers";


ReactDOM.render(
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/whatiscollatz" element={<WhatCollatz />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>,
        document.getElementById('root')
    );