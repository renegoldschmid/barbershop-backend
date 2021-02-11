import {IUser, User} from '../models';
import md5 from 'md5'
import * as bcrypt from 'bcryptjs';

class UserLogic {

  /**
   * Can be unsed to generate a authentification hash
   * @return hash
   */
  static getRegistrationHash() : string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }


  /**
   * Can be used to add a new user
   * After adding the user he or she has to be activateded with @registerUser
   * @param  firstName Firstname of the user
   * @param  lastName  Lastname of the user
   * @param  email     Email of the user
   * @param  password  Password of the user
   * @param  sendMail  Flag if a email should be send or not.
   * @return           the new user
   */
  addUser = async (firstName: string, lastName: string, email: string, password: string, sendMail: boolean = true)=>{
    const randomHash = UserLogic.getRegistrationHash()
    const user = await User.findOne({ email})
    if (user) {
      throw "User already exists"
    }
    const hash = bcrypt.hashSync(password, 2)
    const newUser = User.create({firstName, lastName, email, active: false, registrationHash: randomHash, password: hash})
    return newUser
  }

  /**
   * Can be used to activate the user
   * @param  user the user to activate
   * @return      true if the status was change else false
   */
  registerUser = async (user: IUser)=>{
    if (!user.active) {
      user.active = true
      await user.save()
      return true
    }
    return false
  }

  /**
   * Can be used to login a user
   * @param  email    email of the user
   * @param  password password of the user
   * @return          a new session  for the user
   */
  login = async (email: string, password: string)=>{
    const user = await User.findOne({ email })
    if ( !user || !user.active) {
      throw "No user found"
    }
    const match = bcrypt.compareSync(password,user.password)
    if (match) {
      const session = await this.getSession(user)
      return session;
    } else {
      throw "Invalide username or password"
    }

  }

  /**
   * Adds a new session to a username
   * @param  user The user to add the session
   * @return      a new session for the user
   */
  async getSession(user: IUser){
    const sessionString = `${user.email}_${new Date().getMilliseconds}_${Math.random()}`
    const session = md5(sessionString)
    if ( user.sessionKeys ) {
      user.sessionKeys.push(session)
    }
    user.sessionKeys=[session]
    await user.save()
    return session
  }
}
const userLogic = new UserLogic()
export {userLogic, UserLogic}
export default userLogic
