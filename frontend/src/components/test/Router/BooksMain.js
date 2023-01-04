import React from 'react';

import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import NewBook from "./booksPages/NewBook";
import Book from "./booksPages/Book";
import BookList from "./booksPages/BookList";
import BookLayout from "./booksPages/BookLayout";

export default function BooksMain(){
    return (
        <>
            <h1>[Application]</h1>

            {/*Первый routes*/}
            <Routes>
                <Route path={'/books'} element={<h1>Extra Content on BookList page</h1>}/>
            </Routes>

            <nav>
                <li><Link to="/">Home page</Link></li>
                <li><Link to="/books">BookList page</Link></li>
            </nav>

            {/*Второй routes*/}
            <Routes>
                <Route path="/" element={<h1>[Home]</h1>} />

                <Route path='/books' element={<BookLayout />}>
                    <Route index element={<BookList/>}/>
                    <Route path=':id' element={<Book/>}/>
                    <Route path='new' element={<NewBook/>}/>
                </Route>

                <Route path="*" element={<h1>[Not Found]</h1>} />
            </Routes>
        </>
    );
}