require('dotenv').config();
const express = require('express');
const server = express();
const morgan = require('morgan');

const {client} = require('./db');

server.use(morgan('dev'));

server.use(express.json());

client.connect();
server.listen(1337, () => {
    console.log('The server is up on port 1337')
});