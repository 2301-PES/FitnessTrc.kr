const client = require("./client");
const {
    getActivityById,
    getAllActivities,

} = require("./activities")

async function createRoutine({ creatorId, isPublic, name, goal }) {
    try {
        const {rows: [routine]} = await client.query(`
            INSERT INTO routines(creatorId,isPublic,name,goal)
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
        const {rows: [routine]} = client.query(`
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
        const {rows} = client.query(`
            SELECT * FROM routines;
        `)
        
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getAllRoutines() {

    try {
        // const{rows} = client.query(`
        //     SELECT * 
        //     FROM routines 
        //     JOIN activities 
        //     ON "creatorId" =activities.id;
        // `);
        // return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getAllPublicRoutines() {
    try {
        // const{rows} = client.query(`
        //     SELECT * 
        //     FROM routines 
        //     JOIN activities 
        //     ON "creatorId" =activities.id;
        //     WHERE "isPublic"=true;
        // `);
        // return rows;  
    } catch (error) {
        console.log(error);
    }
}

//stopping point for now
async function getAllRoutinesByUser({ username }) {
    try {
        

    } catch (error) {
        console.log(error);
    }

}

async function getPublicRoutinesByUser({ username }) {

}

async function getPublicRoutinesByActivity({ id }) {

}

async function updateRoutine({ id, ...fields }) {

}

async function destroyRoutine(id) {

}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};