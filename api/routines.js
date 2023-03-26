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
    destroyRoutine
} = require('../db');

routinesRouter.get('/', async (req, res, next) => {
    try {
        let allRoutines = await getAllPublicRoutines();
        console.log(allRoutines);
        res.send(allRoutines);
    } catch(error) {
        console.log(error)
    }
})

routinesRouter.post('/', async (req, res, next) => {
    const { isPublic, name, goal } = req.body;
    const routineData = {};

    try{
        const routinesCreate = await createRoutine({
            creatorId,
            isPublic,
            name,
            goal
        });

        res.send({
            message: "Routine Successfully Created",
        });
    } catch ({ name, message }) {
        next({ name, message })
    } 
});


routinesRouter.patch('/:routineId', async (req, res, next) => {
    const id = req.params.routineId;
    const { isPublic, name, goal  } = req.body;

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
        const updatedRoutine = await updateRoutine({id, fields: updateFields});

        res.send(updatedRoutine);

    } catch ({ name, message }) {
        next({ name, message });
    }
});


routinesRouter.delete('/:routineId', async (req, res, next) => {
    try{
        const deleteRoutineData = await destroyRoutine(req.params.id);
        res.send(deleteRoutineData)
    } catch(error){
        console.log(error)
    }
});

routinesRouter.post('/:routineId/activities', async (req, res, next) => {
    try {
        // const routineActivity = await 
    } catch (error) {
        console.log(error)
    }
})

module.exports = routinesRouter;