//dependency imports
const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

//function imports;
const{ getUserByUsername, createUser } = require('../db/users');
const{ getAllRoutinesByUser, getPublicRoutinesByUser } = require('../db/routines') 
const { requireUser } = require('./utils');


const usersRouter = express.Router();


usersRouter.use((req,res,next)=>{
    console.log("A request is being made to /users");
    next();
})

usersRouter.post('/login', async (req,res,next)=>{
    const {username,password} = req.body;
    if(!username || !password){
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }
    try {
        const user = await getUserByUsername(username);


        const userId = user.id;
        // if (userData.username && userData.password) {
        //     const userInDb = await fetchUserByUsername(userData.username);
  
            if (user) {  
                const areTheyTheSame = await bcrypt.compare(password, user.password);

                if (areTheyTheSame) {
                    const token = await jwt.sign({username, password}, process.env.JWT_SECRET);
                    res.send(
                        {
                            success:true,
                            user: 
                            {
                                userId,
                                username
                            },
                            message: "You are now logged in!", 
                            token: token
                        }).status(200);
                } else {
                    res.send({message: "Wrong password!"}).status(403)
                }
            } else {
                res.send(
                    {
                        success: false,
                        error: {
                            name: "UserError",
                            message: "User does not exist. Please create a new account."
                        },
                        data: null
                    }).status(403);
            }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})
usersRouter.post('/register', async (req,res,next)=>{
    // const {username, password } = req.body;
    try {
        const userData = req.body;
        const alreadyExists = await getUserByUsername(userData.username);
        if(alreadyExists){
            res.send({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        }
        if (userData.username && userData.password && userData.password.length >= 8 && userData.username.length >= 8) {
            // let newSaltValue = await bcrypt.genSalt(12)
            // console.log(userData.password);
            // let newHashedPassword = await bcrypt.hash(userData.password, newSaltValue)

            let newCreatedUser = await createUser({
                username: userData.username, 
                password: userData.password
            })
            // NORMALLY, you would also be generating a JWT on top of hashing the password, and sending that JWT with the response.send method. 
            if (newCreatedUser) {
                const token = await jwt.sign({id: newCreatedUser.id, username: newCreatedUser.username},process.env.JWT_SECRET, {expiresIn: '1w'} );
                res.send(
                {  
                    success: true,
                    error: null,
                    token: token,
                    message: "Thanks for signing up for our service."
                }).status(200)
            } else {
                res.send(
                    {
                        success: false,
                        error: {
                            name: "UserError",
                            message: "failed to create account"
                        },
                        data: null
                        
                    }).status(403)
            }
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
})

usersRouter.get('/me', requireUser, async(req,res,next)=>{
    try {
        const user = req.user;
        if (user){
            res.send({
                id: user.id,
                username: user.username
            });
        } else{
            res.send({
                success: false,
                error: {
                    name: 'user not found',
                    message: 'this user was not found in the system'
                },
                data: null
            })
        }
    } catch (error) {
        console.log(error);
        next(error);
    }

})

//

usersRouter.get('/:username/routines', async (req, res, next) => {
    const { username } = req.params
    const user = req.user;
    console.log("This is the/username/routines route handler");
    console.log(user);
    try {
      const userToken = req.headers.authorization.split(" ")[1];
      const decryptedUserToken = jwt.verify(userToken, process.env.JWT_SECRET);
      if (decryptedUserToken.username && user.username == decryptedUserToken.username){
        const retrieveRoutines = await getAllRoutinesByUser(user);
        res.send(retrieveRoutines)
      } else if (decryptedUserToken.username && user.username != decryptedUserToken.username) {
        const retrieveRoutines = await getPublicRoutinesByUser(user);
        res.send(retrieveRoutines)
      } else {
        res.send({
            name: 'user not valid',
            message: 'Cannot get routines. User is not valid'
        })
      }
     
    } catch({name, message}) {
      next({
          name,
          message
      })
    }
  });

module.exports = usersRouter