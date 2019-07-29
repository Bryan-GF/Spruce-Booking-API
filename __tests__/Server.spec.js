const request = require('supertest');
const server = require('../server/server.js');

describe('server.js', () => {
    describe('/getBookings', async () => {
        it('get bookings returns correct response 200', async () => {
            let response = await request(server)
            .get('/getBookings')
            .query({
                page: 1,
                limit: 1,
                filter: ''
            });
            expect(response.status).toBe(200);
        });

        it('get bookings returns 422 for invalid types', async () => {
            let response = await request(server)
            .get('/getBookings')
            .query({
                page: '',
                limit: 20,
                filter: ''
            });
            expect(response.status).toBe(422);
        });

        it('get bookings should return 400 for missing parameters', async () => {
            let response = await request(server)
            .get('/getBookings')
            .query({
                limit: 20,
                filter: ''
            });
            expect(response.status).toBe(422);
        });

    })

    describe('/createBooking', async () => {
        it('create booking returns correct response 201 on successful creation', async () => {
            let response = await request(server)
            .post('/createBooking')
            .send({Email: 'test@gmail.com', Name: 'test', Street_Address: 'test st', City: 'test city', State: 'TA', Zip_Code: '99119', Booking_Type: 'Dog Walk', Booking_Time: '2015-6-10 01:00:00'})
            expect(response.status).toBe(201);
        });

        it('create booking returns fails on failure returning error code 400', async () => {
            let response = await request(server)
            .post('/createBooking')
            .send({Email: 'test@gmail.com', Name: null, Street_Address: 'test st', City: 'test city', State: 'TA', Zip_Code: '99119', Booking_Type: 'Dog Walk', Booking_Time: '2015-6-10 01:00:00'})
            expect(response.status).toBe(400);
        });

    })
})