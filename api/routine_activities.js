const express = require('express');
const routine_activitiesRouter = express.Router();

const {requireUser} = require('./utils');
const {destroyRoutineActivity} = require('../db/routine_activities');

routine_activitiesRouter.delete('/:routineActivityId', requireUser, async (req,res,next)=>{
    const user = req.user;

    try {
        if(user){
            const destroyedRoutineActivity = await destroyRoutineActivity(req.params.routineActivityId);
            console.log(destroyedRoutineActivity);
            res.send(destroyedRoutineActivity);
        }
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = routine_activitiesRouter;