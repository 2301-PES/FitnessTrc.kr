import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNewActivity = () => {
    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    
    const navigate = useNavigate();

    async function makeNewActivity(e){
        e.preventDefault();
        try {

            const response = await fetch(`${process.env.DATABASE_URL}/api/activities`,
            // const response = await fetch('https://fitnesstrac-kr-pes.onrender.com/api/activities',
                { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                    },
                    body: JSON.stringify({
                            name: activityName,
                            description: activityDescription
                        }
                    )
                }
            )

            const translatedData = await response.json();
            console.log(translatedData)
            if (!translatedData.id) {
                alert('Post was not successfully created. Please try again.')
            } else {
                navigate(`/activities`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form className="routineCreateForm">
            <input type='text' placeholder="New activity name" onChange={(event) => {setActivityName(event.target.value)}}></input>
            <input type='text' placeholder="New activity description" onChange={(event) => {setActivityDescription(event.target.value)}}></input>
            <button onClick={makeNewActivity}>Submit new activity</button>
        </form>
    )
}

export default CreateNewActivity