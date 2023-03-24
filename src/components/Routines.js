import { React } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllRoutines = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [allRoutines, setAllRoutines] = useState([]);

    useEffect(() => {
        async function fetchAllRoutines() {
        
        
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            const desiredResult = result.filter(routine => routine.isPublic);
            console.log()
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
                    <div className="routines" key={routine._id}>
                        <p className="routineName">Name: {routine.name}</p>
                        <p className="routineDescription">Description: {routine.description}</p>
                        <p className="routineDuration">Duration: {routine.duration}</p>
                        <p className="routineCount">Count: {routine.count}</p>
                        <Link to={`/${routine._id}`}>Open this routine</Link>
                    </div>
                )
            }) : "No data available" 
        }
        </div>
    )
}

export default AllRoutines;