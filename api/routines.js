const express = require("express");
const routinesRouter = express.Router();

const { requireUser } = require('./utils');

const { 
    createRoutine,
    getAllRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByActivity,
    getPublicRoutinesByUser,
    getAllPublicRoutines,
    getRoutinesWithoutActivities,
    getRoutineById,
    updateRoutine,
    destroyRoutine,
    getUserByUsername,
    addActivityToRoutine,
} = require('../db');

routinesRouter.get('/', async (req, res, next) => {
    try {
        console.log("this is the start of the routines router");
        let allRoutines = await getAllPublicRoutines();
        console.log("finished the getAllPublicRoutines");
        console.log(allRoutines);
        res.send(allRoutines);
    } catch(error) {
        console.log(error)
    }
})

routinesRouter.post('/', requireUser ,async (req, res, next) => {
    const { isPublic, name, goal } = req.body;
    const routineData = {};
    const user = req.user;

    // const user = await getUserByUsername(userReq.username)



    try{
        if(user){
            const routineToCreate = await createRoutine({
                creatorId : user.id,
                isPublic,
                name,
                goal
            });
    
            res.send(
                routineToCreate
            );
        }
    } catch ({ name, message }) {
        next({ name, message })
    } 
});


routinesRouter.patch('/:routineId',requireUser, async (req, res, next) => {
    const id = req.params.routineId;
    const { isPublic, name, goal  } = req.body;
    const user = req.user;
    const updateFields = {};

    if (isPublic) {
        updateFields.isPublic = isPublic;
    }
    if (name) {
        updateFields.name = name;
    }
    if (goal) {
        updateFields.goal = goal;
    }

    try {
        if(user){
            const updatedRoutine = await updateRoutine({id, fields: updateFields});

            res.send(updatedRoutine);
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});


routinesRouter.delete('/:routineId',requireUser, async (req, res, next) => {
    const user = req.user;
    try{
        if(user){
            const deleteRoutineData = await destroyRoutine(req.params.routineId);
            res.send(deleteRoutineData);
        }
     
    } catch(error){
        console.log(error)
    }
});

routinesRouter.post('/:routineId/activities', async (req, res, next) => {
    const routineId = req.params.routineId;
    const { activityId, count, duration } = req.body;
    try {
        // const routineActivity = await 
        const activityToRoutine = await addActivityToRoutine({ routineId, activityId, count, duration });

        if (activityToRoutine) {
            res.send(activityToRoutine);
        } else {
            res.send(error);
        };
    } catch (error) {
        console.log(error)
    }
})

module.exports = routinesRouter;