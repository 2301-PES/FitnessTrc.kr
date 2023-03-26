const {client} = require('./client');

// database functions
async function createActivity({ name, description }) {
    try {
        const {rows} = await client.query(`
            INSERT INTO activities(name,description)
            VALUES ($1,$2)
            RETURNING *;
        `,[name,description]);

        return rows[0];
        // return activities;
        
    } catch (error) {
        console.log(error);
    }
  // return the new activity
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    const {rows} = await client.query(`
        SELECT * from activities;
    `)
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getActivityById(id) {
    try {
        const {rows: [activity]} = await client.query(`
            SELECT * 
            FROM activities
            WHERE id=$1;
        `,[id]);

        return activity;
    } catch (error) {
        console.log(error);
    }
}

async function getActivityByName(name) {
    try {
        const {rows: [activity]} = await client.query(`
            SELECT *
            FROM activities
            WHERE name=$1;
        `,[name]);

        return activity;

    } catch (error) {
        console.log(error);
    }
}

async function attachActivitiesToRoutines(routines) {
    try {
        console.log(routines)
        const {rows} = await client.query(`
            SELECT * from activities
            JOIN "RoutineActivities"
            ON activities.id = "RoutineActivities"."activityId";
        `);
        console.log("This is routines in attachActivitiesToRoutines function");
        console.log(routines)
        for(let i=0; i<routines.length; i++){
            let answer = rows.filter((singleActivity)=>{
                if(singleActivity.routineId == routines[i].id){
                    return true;
                }else{
                    return false;
                }
            })
            routines[i].activities = answer;
        }
        return routines;
    } catch (error) {
        console.log(error);
    }
}
//ignore for now
//maybe implement later

async function updateActivity({ id, fields= {} }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if(setString.length ===0){
        return
    }

    try {
        const { rows: [ activity ] } = await client.query(`
        UPDATE activities
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
  
      return activity;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};