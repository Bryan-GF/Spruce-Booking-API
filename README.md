# Welcome to the Spruce Booking application API!

#### Tech Stack: [ NodeJS | ExpressJS | Javascript | Jest | Supertest ]

## About:

Spruce booking is a service management application.

Features:
- View and naviagate through list of bookings.
- Filter displayed bookings by booking type.
- Create and store new bookings.

## Running Locally:

To run the application locally, navigate into the application folder and run the following commands:

> yarn install

> yarn start

After a short period the API will be built and can be accessed at http://localhost:4000/.

If you would like to run the tests available for the API, run the follow command:
> yarn test

## Available endpoints:

### Get Bookings

Returns array of json data for bookings (max 20).

- Path: /getBookings  

- Method:   GET  

- URL Params:
    - page [required] = [integer]
    - limit [required] = [integer]
    - filter [optional] = [string]

- Data Params: None  

- Success Resposne:
    - Code: 200
    - Content: {
       totalPages: 1,  
       result: [{
           Name: 'Person One',  
           Email: 'person@gmail.com',
           Street_Address: 'Random Street',
           City: 'Random City',
           State: 'RA',
           Zip_Code: '000000',
           Booking_Type: 'Housekeeping',  
           Booking_Time: '2018-09-27T14:00:00.000Z'  
      }]}  

- Error Resposne:
    - Code: 422
    - Content: { error: 'Page number or limit missing/invalid type.'}

    OR
    - Code: 400
    - Content: { error: 'Server Error!}

Sample Call:

    axios.get('http://localhost:4000/getBookings', 
        {
            page: 1,
            limit: 20,
            filter: 'Dog Walk'
        }
    .then(res => {
        console.log(res);
    }).catch(err=> {
        console.log(err);
    })

************************************
************************************

### Create Booking

Creates a new booking in the database. Returns the given booking id value.

- Path: /createBooking  

- Method: POST  

- URL Params: None

- Data Params: 
    {  
        Name [required]: [string],
        Email [required]: [string],
        Street_Address [required]: [string],
        City [required]: [string],
        State [required]: [string],
        Zip_Code [required]: [string],
        Booking_Type [required]: [string], 
        Booking_Time [required]: [string],
    }
    
- Success Resposne:
    - Code: 201
    - Content: {[7]} <-- Booking ID of newly created booking.

- Error Resposne:
    - Code: 400
    - Content: Content: { error: 'Server Error!}

Sample Call:

    axios.post('http://localhost:4000/createBooking', 
        {
            Name: 'Person One',  
            Email: 'person@gmail.com',
            Street_Address: 'Random Street',
            City: 'Random City',
            State: 'RA',
            Zip_Code: '00000',
            Booking_Type: 'Housekeeping',  
            Booking_Time: '2018-09-27 12:00:00' 
        }
    .then(res => {
        console.log(res);
    }).catch(err=> {
        console.log(err);
    })