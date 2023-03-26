import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyRoutines = (props) => {
    const { routines, setRoutines, fetchRoutines } = props;
    const { createStatus, setCreateStatus } = useState(false);
    const { createName, setCreateName } = useState("");
    const { createGoal, setCreateGoal } = useState("");

    function toggleCreate() {
        setCreateStatus(!createStatus)
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
            fetchRoutines();
        } else {
            props.setIsLoggedIn(false);
            console.log("No token exist");
        }
    }, []);

    const createRequest = async (event) => {
        event.preventDefault();

        const tokenKey = localStorage.getItem("token");

        try {
            const response = await fetch(``, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                    post: {
                        
                    }
                })
            })
        }
    }

    return (

    )
}