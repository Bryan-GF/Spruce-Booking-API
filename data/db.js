const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig);

// Accepts filter string. Returns an array of bookings that meet filter requirements in ascending order.
const getBookings = (filter) => {
    return db('Bookings').orderBy('Booking_Time').where('Booking_Type', 'like', `%${filter}%`);
}

// Accepts booking json data. Creates new row for Booking table.
const createBooking = (booking) => {
    return db('Bookings').insert(booking).returning('Id');
}

module.exports = {
    getBookings,
    createBooking
};