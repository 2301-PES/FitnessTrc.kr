import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import { Header, Home, Routines, Activities, Login, MyRoutines, CreateNewRoutine, SingleRoutine, CreateNewActivity } from "./components";

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
            <Route path='/routines' element={<Routines isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/activities' element={<Activities isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/myroutines' element={<MyRoutines isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
            <Route path='/createnewroutine' element={<CreateNewRoutine isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
            <Route path='/:id' element={<SingleRoutine isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
            <Route path='/createnewactivity' element={<CreateNewActivity isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>

        </Routes> 
    </div>
    </BrowserRouter> 
    ) 
}

const root = createRoot(appElement)
root.render(<App />)