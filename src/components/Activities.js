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
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/activities`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();

            let desiredResult = []
            for (let i = 0; i < 25; i++) {
                desiredResult.push(result[i])
            }

            setAllActivities(desiredResult);
        } catch (e) {
            console.log(e);
        }
    }
    fetchAllActivities();
    }, [])
    
    return (
        <div>
            {
            allActivities.length ? allActivities.map((activity) => {            
                return (
                    <div className="activities" key={activity.id}>
                        <p className="activityName">Name: {activity.name}</p>
                        <p className="activityDescription">Description: {activity.description}</p>
                        <Link className="activityLink" to={`/${activity.id}`}>Open this Activity</Link>
                    </div>
                )
            }) : "No data available" 
        }
        </div>
    )
}

export default AllActivities;