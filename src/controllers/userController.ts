import {Response,Request} from 'express';
import {User} from '../models';
import {userLogic, UserLogic} from '../logic'
import nodemailer from 'nodemailer'
import md5 from 'md5'

class UserController {
  /**
   * Can be used to add a user
   * @param  req Request object
   * @param  res Response object
   * @return     success true or false
   *             if an error occurred error is the message
   */
  addUser = async (req: Request, res: Response)=>{
    const firstName: string = req.query.firstName as string
    const lastName: string = req.query.lastName as string
    const email: string = req.query.email as string
    const password: string = req.query.password as string
    try{
      await userLogic.addUser(firstName,lastName,email,password,true )
      res.json({success: true});
    } catch(e) {
      res.json({success: false, data: {error: e}});
    }
  }

  /**
   * Can be used to registerUser a user
   * @param  req Request object
   * @param  res Response object
   * @return     success true or false
   *             if an error occurred error is the message
   */
  registerUser = async (req: Request, res: Response)=>{
    const hash: string = req.query.hash as string
    const user = await User.findOne({ registrationHash: hash })

    if ( !user ) {
      res.json({success: false, data: {error: "No user found"}});
      return
    }
    await userLogic.registerUser(user)
    res.json({success: true});
  }

  /**
   * Can be used to login a user
   * @param  req Request object
   * @param  res Response object
   * @return     success true or false and the session
   *             if an error occurred error is the message
   */
  login = async (req: Request, res: Response)=>{
    const email: string = req.query.email as string
    const password: string = req.query.password as string

    try{
      const session = await userLogic.login(email,password)
      res.json({success: true, data: {sessionKey: session}});
    } catch(e) {
      res.json({success: false, data: {error: e}});
    }
  }

  updateUser = async (req: Request, res: Response)=>{
    const firstName: string = req.query.firstName as string
    const lastName: string = req.query.lastName as string
    const email: string = req.query.email as string
    const password: string = req.query.password as string
    try{
      await userLogic.addUser(firstName,lastName,email,password,true )
      res.json({success: true});
    } catch(e) {
      res.json({success: false, data: {error: e}});
    }
  }
}
const userController = new UserController()
export {userController, UserController}
export default userController
