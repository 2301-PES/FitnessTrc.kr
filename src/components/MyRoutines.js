import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyRoutines = (props) => {
    // const { routines, setRoutines, fetchRoutines } = props;
    const { IsPublic, setIsPublic } = useState(false);
    const { routineName, setRoutineName } = useState("");
    const { routineGoal, setRoutineGoal } = useState("");
    const [myRoutines, setMyRoutines] = useState([]);
    const [myId, setMyId] = useState(null);

    function toggleCreate() {
        setCreateStatus(!createStatus)
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
            fetchMyUserData();
            fetchMyRoutines(myId);
        } else {
            props.setIsLoggedIn(false);
            console.log("No token exist");
        }
    }, []);

    // const fetchMyUserData = async (event) => {
    const fetchMyUserData = async () => {
        // event.preventDefault();

        const tokenKey = localStorage.getItem("token");

        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                    // Authorization:  `Bearer ${localStorage.getItem('token')}`
                  },
                });
                // console.log(tokenKey);
                const result = await response.json();
                console.log(result);
                setMyId(result.id);
                fetchMyRoutines(result.id);
                console.log(result.id);

                // return result
        }catch(error){
            console.log(error);
        }
    }
    async function fetchMyRoutines(id) {
        
        
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            const desiredResult = result.filter(routine => routine.id ==id );
            setMyRoutines(desiredResult);
        } catch (e) {
            console.log(e);
        }
    }



    return (
        <div>
            <div>

            </div>
            <div>
                {
                    !myRoutines.length ?<div>No routines dumbass</div> : myRoutines.map((singleRoutine,index)=>{
                        return(
                            <div key={index +1}>
                                <p>{index+1}. {singleRoutine.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default MyRoutines;
