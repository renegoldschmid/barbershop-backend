import {notEqual,equal} from 'assert';
import {User} from '../../src/models/User';
import {db} from '../../src/stores/db';
import {seed} from '../../src/db/Seed';
import testConfig from "../../config/config.test.json"

const setupDb = async () => {
  await db.setup(testConfig.db)
  await User.remove({})
  await seed.plantUserSeeds();
}

describe('User Controller Test', function() {
  describe('Test adding User', function() {
    it('should start with an empty database', async function() {
      await setupDb()
      equal(await User.count({}), 0)
    });
    it('should add a new User named Luke Skywalker', async function() {
      const now = new Date()
      const luke = await User.create({
        firstName: "Luke",
        lastName: "Skywalker",
        email: "Luke.Skywalker@thsForce.com",
        active: true,
        registrationHash: "asdf",
        password: "IAmYourFather",
        sessionKeys: [],
      })
      luke.save()
      const lukeFromDB = await User.findOne({firstName: 'Luke', password: "IAmYourFather"});
      notEqual(lukeFromDB, null)
    });
  });
});
