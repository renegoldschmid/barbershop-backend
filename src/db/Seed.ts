import {User, BookingType} from "../models"
import db from '../stores/db';

class Seed  {
  async plantUserSeeds(){
    /*
    let testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.at',
      active: true,
      registrationHash: 'nme0549v8v0h46n5jrdsj94d1mwk2fsx71wxl6ba8eys1l1v0ijghxa036z2n5iz3ti',
      password: '$2a$04$NDH710Cidhc5PTrcx16G9OBY0mocfA70szpVeQh.ejKHNLlZLbmBO', //123
      sessionKeys: []
    })
    testUser.save()
    */
  }

  /**
   * Duration is in Timeslots (1 = 15min)
   */
  async plantTypeSeeds() {
    await BookingType.remove({})

    let typeShaving = await BookingType.create({
      type: 'Shaving',
      duration: 1
    })
    typeShaving.save()

    let typeCutting = await BookingType.create({
      type: 'Cutting',
      duration: 2
    })
    typeCutting.save()

    let typeCombo = await BookingType.create({
      type: 'Combo',
      duration: 3
    })
    typeCombo.save()
  }

  async plantThemAll() {
    console.log("👨‍🌾 Going to plant all the seeds")
    await this.plantUserSeeds()
    await this.plantTypeSeeds()
  }

}
const seed = new Seed()
export default seed;
export {seed}