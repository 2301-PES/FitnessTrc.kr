import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = (props) => {
    const { isLoggedIn } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        props.setIsLoggedIn(false);
        navigate('./');
      }

    return(
        <header>
            <h1 id="fitnessTrackerHeader">Fitness Tracker</h1>
            <div id='homeContent'>
                    <div>   
                        <Link to='/home' className="headerButton"> Home </Link>
                        <Link to='/routines' className="headerButton"> Routines </Link> 
                        <Link to='/myroutines' className="headerButton"> My Routines </Link>
                        <Link to='/activities' className="headerButton"> Activities </Link>
                        {!isLoggedIn ? <Link to='/login' className="headerButton"> Login </Link> : <button onClick={handleLogout}> Logout </button>}
                    </div>  
            </div>
        </header>
    )
}

export default Header