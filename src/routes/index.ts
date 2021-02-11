import {userController, bookingController} from '../controllers';
import express from 'express';

export default (app: express.Application) => {
    app.route('/user')
        .post(userController.addUser)
    app.route('/user')
        .put(userController.updateUser)
    app.route('/user/register')
        .post(userController.registerUser)
    app.route('/login')
        .get(userController.login)
    app.route('/book')
        .get(bookingController.addAppointment)
    app.route('/timeSlots')
        .get(bookingController.timeSlots)
    app.route('/validTimeSlots')
        .get(bookingController.validTimeSlots)
};
