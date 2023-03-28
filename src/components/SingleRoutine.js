import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleRoutine = (props) => {
    props.setIsLoggedIn(true)
    const [ currentRoutine, setCurrentRoutine ] = useState({})
    const [activities, setActivities] = useState([]);
    const {id} = useParams();
    async function fetchCurrentRoutine() {
        try {
            // const response = await fetch(`${process.env.DATABASE_URL}/api/routines`, {
            const response = await fetch(`https://fitnesstrac-kr-pes.onrender.com/api/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            const desiredResult = result.filter ((routine) => {
                return routine.id == id
            })
            setCurrentRoutine(desiredResult[0] || {});
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        
        
        async function fetchActivities() {
            try {
                // const response = await fetch(`${process.env.DATABASE_URL}/api/activities`, {
              const response = await fetch(`https://fitnesstrac-kr-pes.onrender.com/api/activities`, {
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              const result = await response.json();
              setActivities(result);
            } catch (e) {
              console.log(e);
            }
          }
    fetchActivities();      
    fetchCurrentRoutine();
    }, [])
    
    const [editName, setEditName] = useState(currentRoutine.name);
    const [editGoal, setEditGoal] = useState(currentRoutine.goal);
    const [editIsPublic, setEditIsPublic] = useState(currentRoutine.isPublic);

    const [myId, setMyId] = useState(0);

    useEffect(() => {
        
        if (localStorage.getItem("token")) {
            fetchMyData(); 
        } else {
            props.setIsLoggedIn(false)
            console.log("No token exists!")
        }

        async function fetchMyData() {
            try {
                // const response = await fetch(`${process.env.DATABASE_URL}/api/users/me`,{
                const response = await fetch("https://fitnesstrac-kr-pes.onrender.com/api/users/me", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const translatedData = await response.json(); 
                
                setMyId(translatedData.id)
            } catch (error) {
                console.log(error); 
            }
        }
    }, [])

    async function editRoutine(id) {
        
        if (currentRoutine.creatorId != myId){
            alert("You cannot edit someone else's routine!");
            return;
        }

        try {
            const response = await fetch(
                // `${process.env.DATABASE_URL}/api/routines/${id}`,
                `https://fitnesstrac-kr-pes.onrender.com/api/routines/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        name: editName,
                        goal: editGoal,
                        isPublic: editIsPublic
                    }),
                }
            );
    
            const data = await response.json();
    
            setCurrentRoutine(data);
            setEditName(data.name);
            setEditGoal(data.goal);
            setEditIsPublic(data.isPublic);
    
        } catch (error) {
            console.error(error);
        }
    }

    const [activityCount, setActivityCount ] = useState('');
    const [activityDuration, setActivityDuration ] = useState('');
    const [activityId, setActivityId] = useState(0);

    async function attachActivityToRoutine (id) {
        if (currentRoutine.creatorId != myId){
            alert("You cannot edit someone else's routine!");
            return;
        }

        try {
            const response = await fetch(
                // `${process.env.DATABASE_URL}/api/routines/${id}/activities`,
                `https://fitnesstrac-kr-pes.onrender.com/api/routines/${id}/activities`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        activityId: activityId,
                        count: activityCount,
                        duration: activityDuration
                    }),
                }
            );
    
            const data = await response.json();
            console.log(data)
            setCurrentRoutine(fetchCurrentRoutine());
            // if(data){
            //     let filteredData = data.filter((singleData)=>{

            //     })
            // }
            // setCurrentRoutine(currentRoutine + currentRoutine.data);
            // setEditName(data.name);
            // setEditGoal(data.goal);
            // setEditIsPublic(data.isPublic);
    
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="singleRoutine"> 
            <Link className="singleRoutineLink" to="/routines" >Click here to return to all routines</Link>
            {
                !currentRoutine ? <h1> &nbsp; </h1> :
                <div>
                    <p className="routineName">Name: {currentRoutine.name}</p>
                    <p className="routineGoal">Goal: {currentRoutine.goal}</p>
                    <p className="routineIsPublic">Is Public? {currentRoutine.isPublic ? 'Yes' : 'No'}</p>
                    {currentRoutine.activities ? (
                        // <p className="routineActivities">
                        //     Activities: {currentRoutine.activities.map(activity => "Name: " + activity.name +"Duration: " + activity.duration + " Count: " + activity.count + " Description: " +   activity.description).join(", ")}
                        // </p>
                        <div className="routineActivities">
                            Activities: {currentRoutine.activities.map(activity =>
                                <div key={activity.id}>
                                    Name: {activity.name} <br />
                                    Duration: {activity.duration} <br />
                                    Count: {activity.count} <br />
                                    Description: {activity.description}
                                    <p></p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>No activities yet</p>
                    )}


                    <div id="activity-dropdown">
                        <label>Select an activity to add:</label>
                        <select onChange={(event) => setActivityId(event.target.value)}>
                            <option value="">-- Choose an activity --</option>
                            {activities.map((activity) => (
                            <option key={activity.id} value={activity.id}>{activity.name}</option>
                            ))}
                        </select>
                        <label>Count:</label>
                        <input type="number" value={activityCount} onChange={(e) => setActivityCount(e.target.value)} />
                        <label>Duration (in minutes):</label>
                        <input type="number" value={activityDuration} onChange={(e) => setActivityDuration(e.target.value)} />
                        <button onClick={() => attachActivityToRoutine(id)}>Add Activity</button>
                    </div>


                    <input
                        type="text"
                        placeholder="Edit routine name here"
                        value={editName}
                        onChange={(event) => setEditName(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Edit routine goal here"
                        value={editGoal}
                        onChange={(event) => setEditGoal(event.target.value)}
                    />
                    <label> Edit is public status
                        <select type='text' placeholder="Is public?" onChange={(event) => {setEditIsPublic(event.target.value == 'true')}}>
                            <option value='true'>True</option>
                            <option value='false'>False</option>
                        </select>
                    </label>
                    <button 
                        onClick={() => editRoutine(id)}
                        type="submit"
                    >
                        Submit Changes
                    </button>
                </div>
            }   
        </div>
    )
}

export default SingleRoutine