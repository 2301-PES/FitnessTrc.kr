const {client} = require("./client");
const {
    getActivityById,
    getAllActivities,
    attachActivitiesToRoutines,

} = require("./activities");
const { getUserByUsername } = require("./users");

async function createRoutine({ creatorId, isPublic, name, goal }) {
    try {
        const {rows: [routine]} = await client.query(`
            INSERT INTO routines("creatorId","isPublic",name,goal)
            VALUES($1,$2,$3,$4)
            RETURNING*;
        `,[creatorId,isPublic,name,goal])

        // return rows[0];
        return routine;
    } catch (error) {
        console.log(error);
    }

}

async function getRoutineById(id) {
    try {
        const {rows: [routine]} = await client.query(`
            SELECT *
            FROM routines
            WHERE id=$1;
        `,[id]);

        return routine;
        
    } catch (error) {
        console.log(error);
    }

}

async function getRoutinesWithoutActivities() {
    // select and return an array of all routines
    try {
        const {rows} = await client.query(`
            SELECT * FROM routines;
        `)
        
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getAllRoutines() {

    try {
        const{rows} = client.query(`
            SELECT * 
            FROM routines; 
        `);

        
        let allroutines = await attachActivitiesToRoutines(rows);
        return allroutines;
    } catch (error) {
        console.log(error);
    }
}

async function getAllPublicRoutines() {
    try {
        const{rows} = client.query(`
            SELECT * 
            FROM routines 
            WHERE "isPublic"=true;
        `);
        let allRoutines = await attachActivitiesToRoutines(rows);
        return allRoutines;  
    } catch (error) {
        console.log(error);
    }
}

async function getAllRoutinesByUser({ username }) {
    try {

        console.log("This is our username in getAllRoutines"+username);
        const user = await getUserByUsername(username);
        console.log(user);
        const { rows } = await client.query(`
        SELECT * 
        FROM routines 
        WHERE "creatorId"=$1;
      `,[user.id]);
        let allUserRoutines = await attachActivitiesToRoutines(rows);
        return allUserRoutines;
    } catch (error) {
        console.log(error);
    }

}

async function getPublicRoutinesByUser({ username }) {
    try {
        console.log("This is our username in getAllPublicRoutines"+username);

        const user = await getUserByUsername(username)
        console.log(user);
        const { rows } = await client.query(`
        SELECT * 
        FROM routines 
        WHERE "creatorId"=$1
        AND "isPublic"=true;
      `,[user.id]);
        let allUserRoutines = await attachActivitiesToRoutines(rows);
        return allUserRoutines;
    } catch (error) {
        console.log(error);
    }
}

//stretch goal
// async function getPublicRoutinesByActivity({ id }) {

// }

async function updateRoutine({ id, fields = {} }) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    try {
        if (setString.length) { await client.query(`
        UPDATE routines
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
    `, Object.values(fields));
    }
        return await getRoutineById(id);

    } catch (error) {
        console.log(error);
    }
}

async function destroyRoutine(id) {
    try{
        const routineToDelete= await getRoutineById(id)

        await client.query(`
            DELETE FROM routines
            WHERE id = $1;
        `, [id]);

        return routineToDelete;

    } catch(error){
        console.error(error);
        throw error;
    }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
//   getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};