import {notEqual,equal} from 'assert';
import {User} from '../../src/models/User';
import {Booking} from '../../src/models/Booking';
import {db} from '../../src/stores/db';
import {seed} from '../../src/db/Seed';
import testConfig from "../../config/config.test.json"

const setupDb = async () => {
  await db.setup(testConfig.db)
  await Booking.remove({})
  await seed.plantTypeSeeds()
}

describe('Booking Controller Test', function() {
  describe('Test add an appointment (Booking)', function() {
    it('should start with an empty database', async function() {
      await setupDb()
      equal(await Booking.count({}), 0)
    });
    it('should add a new User named Master Booker', async function() {
      const now = new Date()
      const user = await User.create({
        firstName: "Master",
        lastName: "Booker",
        email: "master.booker@champ.com",
        active: true,
        registrationHash: "1234",
        password: "ImTheMaster",
        sessionKeys: [],
      })
      user.save()
      const userFromDB = await User.findOne({firstName: 'Master', password: "ImTheMaster"});
      notEqual(userFromDB, null)
    });
    it('should add a new appointment with type Haircut for previously created User', async function() {
      const now = new Date()
      const userFromDB = await User.findOne({firstName: 'Master', password: "ImTheMaster"});
      notEqual(userFromDB, null);
      if (!userFromDB ) {
        return;
      }
      const appointment = await Booking.create({
        date: now,
        type: "Haircut",
        userId: userFromDB.id
      })
      appointment.save()
      const appointmentFromDB = await Booking.findOne({type: 'Haircut'});
      notEqual(appointmentFromDB, null)
    });
  });
});
