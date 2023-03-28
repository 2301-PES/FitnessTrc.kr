import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNewRoutine = () => {
    const [routineName, setRoutineName] = useState('');
    const [routineGoal, setRoutineGoal] = useState('');
    const [routineIsPublic, setRoutineIsPublic] = useState(true);
    const navigate = useNavigate();

    async function makeNewRoutine(e){
        e.preventDefault();
        try {

            // const response = await fetch(`${process.env.DATABASE_URL}/api/routines`,
            const response = await fetch('https://fitnesstrac-kr-pes.onrender.com/api/routines', 
                { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                    },
                    body: JSON.stringify({
                            name: routineName,
                            goal: routineGoal,
                            isPublic: routineIsPublic
                        }
                    )
                }
            )

            const translatedData = await response.json();
            console.log(translatedData)
            if (!translatedData.id) {
                alert('Post was not successfully created. Please try again.')
            } else {
                navigate(`/${translatedData.id}`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form className="routineCreateForm">
            <input type='text' placeholder="New routine name" onChange={(event) => {setRoutineName(event.target.value)}}></input>
            <input type='text' placeholder="New routine goal" onChange={(event) => {setRoutineGoal(event.target.value)}}></input>
            <label> Is Public?
                <select type='text' placeholder="Is Public?" onChange={(event) => {setRoutineIsPublic(event.target.value == 'true')}}>
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                </select>
            </label>
            <button onClick={makeNewRoutine}>Submit new routine</button>
        </form>
    )
}

export default CreateNewRoutine