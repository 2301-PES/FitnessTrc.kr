const {client} = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  duration,
  count,
}) {
    try {
        const {rows: [routineActivity]} = await client.query(`
            INSERT INTO "RoutineActivities"("routineId","activityId", duration, count)
            VALUES ($1,$2,$3,$4)
            RETURNING *;
        `, [routineId, activityId, duration, count]);
        // return rows;
        return routineActivity;
    } catch (error) {
        console.log(error);
    }

}

async function getRoutineActivityById(id) {
  try {
    const {rows} = await client.query(`
      SELECT * from "RoutineActivities"
      WHERE id=$1;
    `, [id]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getRoutineActivitiesByRoutine({ id }) {

}
//stretch goal
// async function updateRoutineActivity({ id, ...fields }) {

// }

async function destroyRoutineActivityByRoutineId(id) {
    try {
      const {rows} = await client.query(`
        DELETE FROM "RoutineActivities"
        WHERE "routineId"=$1;
      `, [id]);
      
      return rows;

    } catch (error) {
      console.log(error);
    }
}
async function destroyRoutineActivity(id) {
  try {
    const myRoutineActivity = await getRoutineActivityById(id);
    console.log("This is the start of destroyRoutineActivity function. id: ");
    console.log(id);
    const {rows} = await client.query(`
      DELETE FROM "RoutineActivities"
      WHERE id=$1;
    `, [id]);
    // console.log(routineActivity);
    console.log(rows);
    console.log(rows[0]);
    return myRoutineActivity[0];

  } catch (error) {
    console.log(error);
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {

}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  // updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
  destroyRoutineActivityByRoutineId,
};