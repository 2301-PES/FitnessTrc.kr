import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const MyRoutines = (props) => {
    
    const { IsPublic, setIsPublic } = useState(false);
    const { routineName, setRoutineName } = useState("");
    const { routineGoal, setRoutineGoal } = useState("");
    const [myRoutines, setMyRoutines] = useState([]);
    const [myId, setMyId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
            fetchMyUserData();
            // fetchMyRoutines();
        } else {
            props.setIsLoggedIn(false);
            console.log("No token exist");
        }
    }, []);

    
    const fetchMyUserData = async () => {
        const tokenKey = localStorage.getItem("token");
        try {
            // const response = await fetch(`${process.env.DATABASE_URL}/api/users/me`, {
            const response = await fetch(`https://fitnesstrac-kr-pes.onrender.com/api/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                  },
                });
                const result = await response.json();
                // console.log("this is line 38 result:  " +JSON.stringify(result));
                setMyId(result.id);
                fetchMyRoutines(result.username);

        }catch(error){
            console.log(error);
        }
    }


    async function fetchMyRoutines(username) {
        try {
            // console.log(username);
            // const response = await fetch(`${process.env.DATABASE_URL}/api/users/${username}/routines`,{
          const response = await fetch(`https://fitnesstrac-kr-pes.onrender.com/api/users/${username}/routines`, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const result = await response.json();
        //   console.log("This is the console.log on line 58");
        //   console.log(result);
          setMyRoutines(result);
        } catch (e) {
          console.log(e);
        }
      }
      


    async function deleteRoutine(event) {
        try {
            // const response = await fetch(`${process.env.DATABASE_URL}/api/routines/${event.target.value}`,
            const response = await fetch(`https://fitnesstrac-kr-pes.onrender.com/api/routines/${event.target.value}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })

            const translatedResponse = await response.json();

            console.log(translatedResponse)

            if (translatedResponse) {
                let filteredMyRoutines = myRoutines.filter((individualRoutine) => {
                    if (individualRoutine.id != translatedResponse.id) {
                        return individualRoutine
                    }
                })
                setMyRoutines(filteredMyRoutines);

                // myRoutines = filteredMyRoutines
            }
        
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="singleRoutine">
            <Link className="routineLink"to='/createnewroutine'>Click here to create a new routine</Link>
            {/* <div> */}
                <div>
                    {
                        !myRoutines.length ?<div>No routines yet. Please create a routine</div> : myRoutines.map((singleRoutine,index)=>{
                            return(
                                <div key={index +1}>
                                    <p>{index+1}. {singleRoutine.name}</p>
                                    <p>{singleRoutine.creatorName}</p>
                                    <p>{singleRoutine.goal}</p>
                                    <button value={singleRoutine.id} onClick={deleteRoutine} type='submit' > Delete this routine</button>
                                </div>
                            )
                        })
                    }
                </div>
            {/* </div> */}
        </div>
    )
}
export default MyRoutines;
