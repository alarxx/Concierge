import React from 'react';

import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import CreatePost from "../../pages/post/CreatePost";

export default function Main(){
    return (
        <Router>
            <h1>[Application]</h1>
            <nav>
                <li><Link to="/">Home page</Link></li>
                <li><Link to="/about">About page</Link></li>
                <li><Link to="/post/create">Create Post</Link></li>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About />} />
                <Route path='/post'>
                    <Route path='create' element={<CreatePost/>} />
                </Route>
            </Routes>
        </Router>
    );
}