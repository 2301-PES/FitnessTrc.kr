import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = (props) => {
    const { isLoggedIn } = props;
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('token');
        props.setIsLoggedIn(false);
        navigate('/');
    }
    function notLoggedIn(){
        alert("Please log in to see this!");
        navigate('/');
    }

    return(
        <header>
            <img id="headerLogo" src="/logo.jpg" alt="Fitness Tracker logos"/>
                    <div id="headerButtonGroup">   
                        <Link to='/' className="headerButton"> Home </Link>
                        <Link to='/routines' className="headerButton"> Routines </Link> 
                        {isLoggedIn ?<Link to='/myroutines' className="headerButton"> My Routines </Link>: undefined }
                        {/* {isLoggedIn ? <Link to='/myroutines' className="headerButton"> My Routines </Link> : <a href="#" onClick={() => alert("error")} className="headerButton"> My Routines </a>} */}
                        <Link to='/activities' className="headerButton"> Activities </Link>
                        {!isLoggedIn ? <Link to='/login' className="headerButton"> Login </Link> : <Link onClick={handleLogout} className="headerButton"> Logout </Link>}
                    </div>  
        </header>
    )
}

export default Header