const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  duration,
  count,
}) {
    try {
        const {rows} = client.query(`
            INSERT INTO "RoutineActivities"("routineId","activityId", duration, count)
            VALUES($1,$2,$3,$4)
            RETURNING *;
        `, [routineId, activityId, duration, count]);

        
        return rows;
    } catch (error) {
        console.log(error);
    }

}

async function getRoutineActivityById(id) {

}

async function getRoutineActivitiesByRoutine({ id }) {

}

async function updateRoutineActivity({ id, ...fields }) {

}

async function destroyRoutineActivity(id) {

}

async function canEditRoutineActivity(routineActivityId, userId) {

}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};