import {Response,Request} from 'express';
import {User} from '../models';
import {bookingLogic} from '../logic';

class BookingController {
  /**
   * Can be used to book an appointment
   * @param  req Request object
   * @param  res Response object
   * @return     success true or false
   *             if an error occurred error is the message
   */
  addAppointment = async (req: Request, res: Response)=>{
    const sessionKey: string = req.query.sessionKey as string
    const date: Date = new Date( parseInt(req.query.date as any as string, 10))
    const type: string = req.query.type as string
    const storeId: number = parseInt(req.query.storeId as any as string, 10);

    const user = await User.findOne({sessionKeys: sessionKey});
    if ( !user ) {
      console.log("User not found")
      res.json({success: false, data: {message: "User not found"}});
      return
    }
    if( !date ) {
      console.log("Date not found")
      res.json({success: false, data: {message: "Date not found"}});
      return
    }
    if( !type ) {
      console.log("Booking-Type not found")
      res.json({success: false, data: {message: "Booking-Type not found"}});
      return
    }
    if( !storeId ) {
      console.log("No store ID given")
      res.json({success: false, data: {message: "No store ID given"}});
      return
    }

    try {
      const appointment = await bookingLogic.addAppointment(date,type,user["_id"],storeId)
      console.log("Done")
      res.json({success: true, data: {appointment}});
    } catch(e) {
      console.log("Error ", e)
      res.json({success: false, data: {error: e}});
    }
  }

  /**
   * Can be used to get available time slots for a given date
   * @param  req Request object
   * @param  res Response object
   * @return     success true or false
   *             if an error occurred error is the message
   */
  timeSlots = async (req: Request, res: Response)=>{
    const date: Date = new Date( parseInt(req.query.date as any as string, 10) * 1000 )
    const storeId: number = parseInt(req.query.storeId as any as string, 10);
    if( !date ) {
      res.json({success: false, data: {message: "Date not found"}});
      return
    }

    try {
      const timeSlots = await bookingLogic.getTimeSlots(date,storeId);
      res.json({success: true, data: timeSlots});
    } catch(e) {
      res.json({success: false, data: {error: e}});
    }
  }

  /**
   * Can be used to get available valid time slots for a given date
   * @param  req Request object
   * @param  res Response object
   * @return     success true or false
   *             if an error occurred error is the message
   */
  validTimeSlots = async (req: Request, res: Response)=>{
    const date: Date = new Date( parseInt(req.query.date as any as string, 10) * 1000 )
    const type: string = req.query.type as string
    const storeId: number = parseInt(req.query.storeId as any as string, 10);

    if( !date ) {
      res.json({success: false, data: {message: "Date not found"}});
      return
    }
    if( !type ) {
      res.json({success: false, data: {message: "Booking-Type not found"}});
      return
    }

    try {
      const validTimeSlots = await bookingLogic.getValidTimeSlots(date, type,storeId);
      res.json({success: true, data: {validTimeSlots}});
    } catch(e) {
      res.json({success: false, data: {error: e}});
    }
  }
}

const bookingController = new BookingController()
export {bookingController, BookingController}
export default bookingController
