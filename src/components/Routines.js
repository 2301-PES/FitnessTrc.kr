import { React } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllRoutines = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [allRoutines, setAllRoutines] = useState([]);

    useEffect(() => {
        async function fetchAllRoutines() {
        
        
        try {
            // const response = await fetch(`${process.env.DATABASE_URL}/api/routines`,{
            const response = await fetch(`https://fitnesstrac-kr-pes.onrender.com/api/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            const desiredResult = result.filter(routine => routine.isPublic);
            setAllRoutines(desiredResult);
        } catch (e) {
            console.log(e);
        }
    }
    fetchAllRoutines();
    }, [])
    
    return (
        <div>
            {
            allRoutines.length ? allRoutines.map((routine) => {            
                return (
                    <div className="routines" key={routine.id}>
                        <p className="routineName">Name: {routine.name}</p>
                        <p className="routineDescription">Goal: {routine.goal}</p>
                        {/* <p className="routineDescription">Creator Name: {routine.creatorName}</p> */}
                        <div className="activitiesInRoutineList">List of activities: {routine.activities.map((activity) => {
                            return (
                            <div className="routines" key={activity.id}>
                                <p className="activityInRoutine"> Activity name: {activity.name} </p>
                            </div>)
                        })}</div>
                        {/* <p className="routineCount">Count: {routine.count}</p> */}
                        <Link className="routineLink" to={`/${routine.id}`}>Open this routine</Link>
                    </div>
                )
            }) : "No data available" 
        }
        </div>
    )
}

export default AllRoutines;