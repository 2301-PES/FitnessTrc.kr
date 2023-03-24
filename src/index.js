import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import { Header, Home, Login } from "./components";

const appElement = document.getElementById("app")

const App = () => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [postList, setPostList] = useState([]);

    return ( 
    <BrowserRouter>
    <div> 
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
            <Route path='/' element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            {/* <Route path='/posts' element={<Posts postListProps={postList} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/createnewpost' element={<CreateNewPost />} />   
            <Route path='/:id' element={<SinglePost postListProps={postList}/>} > </Route>  */}
        </Routes> 
    </div>
    </BrowserRouter> 
    ) 
}

const root = createRoot(appElement)
root.render(<App />)