import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Home = (props) => {
    const { isLoggedIn } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        props.setIsLoggedIn(false);
        navigate('./');
      }

    return(
        <div id="home">
            <div id='homeContent'>
                <h1>Welcome to Fitness Tracker! Here you can customize and save your ideal workout routines. Click the button below to login or the Routines button at the top to view a list of available routines.</h1>               
            </div>
            <Link id="loginHyperlink" to='/login'> Click here to Login/Register </Link>
        </div> 
   )
}

export default Home