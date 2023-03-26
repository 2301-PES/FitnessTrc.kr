const express = require('express');
const activitiesRouter = express.Router();

const { 
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    getActivityByName
} = require('../db');

//stretch goal
activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
    const activities = await getActivityById(req.params.activityId);
    if(!req.params.activityId){
        console.log(error);
        next(error);
    }
    try{
        res.send(
            activities
        );
    } catch(error) {
        console.log(error);
        next(error);
    }
});
//end of stretch goal

activitiesRouter.get('/', async (req, res) => {
    try {
        const activitiesData = await getAllActivities();
        if (activitiesData){
            res.send(
                activitiesData
            );
        } else {
            res.send({
                success : false,
                error : {
                    name: 'activitiesRouter not found',
                    message : 'No activites to be found'
                },
            data : null
            })
        }
    } catch (error) {
        console.log(error)
    };
});


activitiesRouter.post('/', async (req, res, next) => {
    const { name, description } = req.body;
    try{
        const createdActivity = await createActivity({
            name,
            description
        });

        res.send({
            message: "Activity Successfully Created",
            createdActivity
        });
    } catch ({ name, message }) {
        next({ name, message })
    } 
});

activitiesRouter.patch('/:activityId', async (req, res, next) => {
    const id = req.params.activityId;
    const { name, description  } = req.body;
    console.log(id);

    const updateFields = {};

    if (name) {
        updateFields.name = name;
    }
    if (description) {
        updateFields.description = description;
    }
    try {
        console.log(updateFields);
        const updatedActivity = await updateActivity({id, fields: updateFields});
        console.log("done");
        res.send(updatedActivity);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = activitiesRouter