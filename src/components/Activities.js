import { React } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllActivities = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [allActivities, setAllActivities] = useState([]);

    useEffect(() => {
        async function fetchAllActivities() {
        
        
        try {
            // const response = await fetch(`http://localhost:1337/api/activities`, {
            const response = await fetch(`https://fitnesstrac-kr-pes.onrender.com/api/activities`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();

            let desiredResult = []
            for (let i = 0; i < result.length; i++) {
                desiredResult.push(result[i])
            }

            // console.log(desiredResult);
            setAllActivities(desiredResult);
        } catch (e) {
            console.log(e);
        }
    }
    fetchAllActivities();
    }, [])
    
    return (
        <div className="singleRoutine">
            <Link className="routineLink" to={`/createnewactivity`}>Click here to create a new activity</Link>
            <div>
                {
                    allActivities.length ? allActivities.map((activity) => {            
                        return (
                            <div className="activities" key={activity.id}>
                                <p className="activityName">Name: {activity.name}</p>
                                <p className="activityDescription">Description: {activity.description}</p>
                            </div>
                        )
                    }) : "No data available" 
                }
            </div>
        </div>
    )
}

export default AllActivities;