require('dotenv').config()
const express = require('express');
const server = express();
const cors = require('cors');
const db = require('../data/db');

server.use(express.json())
server.use(cors());

// Route passed filter string, page number value, and limit value (results per page) through query parameters.
// On success returns array of length 'limit' of bookings.
server.get('/getBookings', async (req, res, next) => {
    db.getBookings(req.query.filter)
    .then(response => {

        if((!req.query.page || !req.query.limit) && (typeof req.query.page != 'number' || typeof req.query.limit != number)) {
            let err = new Error('Page number or limit missing/invalid type.');
            err.statusCode = 422;
            throw err;
        }

        let upperRange = req.query.page * req.query.limit;

        let newArr = response.slice(upperRange - 20, upperRange);

        res.status(200).json(
            {
                totalPages: Math.floor(response.length / req.query.limit),
                results: newArr,
            }
        );

    }).catch(err => {
        if(err.statusCode) {
            res.status(err.statusCode).json(err.message);
        } else {
            res.status(400).json({error: 'Server error!'});
        }     
    })
    
});


// Route passed new booking json data through request body.
// On success returns the id of the new booking in the form of an array.
server.post('/createBooking', async(req,res) => {
    
    let booking = req.body;

    db.createBooking(booking)
    .then(response => {
        res.status(201).json(response);
    }).catch(err => {
        res.status(400).json({error: 'Server error!'});
    })
})

module.exports = server;