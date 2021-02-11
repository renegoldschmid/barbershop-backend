import {notEqual,equal} from 'assert';
import {userLogic} from '../../src/logic';
import { User} from '../../src/models';
import {db} from '../../src/stores/db';
import {seed} from '../../src/db/Seed';

import testConfig from "../../config/config.test.json"

const setupDb = async () => {
  await db.setup(testConfig.db)
  await User.remove({})
  await seed.plantUserSeeds();
}


describe('UserLogic Test', function() {
  describe('Test addUser', function() {
    it('should start without User', async function() {
      await setupDb()
      equal(await User.count({}), 0)
    });
    it('should add a new User', async function() {
      await setupDb()
      equal(await User.count({}), 0)
      await userLogic.addUser("Max","Mustermann","max.mustermann@mustermail.com","123",false)
      equal(await User.count({}), 1)
    });
    it('should not be passible to add a user twice', async function() {
      await setupDb()
      equal(await User.count({}), 0)
      await userLogic.addUser("Max","Mustermann","max.mustermann@mustermail.com","123",false)
      let error = false
      try{
        await userLogic.addUser("Max","Mustermann","max.mustermann@mustermail.com","123",false)
      } catch(e){
        error = true
      }
      equal(error, true)
      equal(await User.count({}), 1)
    });
    it('should not be passible to add 2 different user', async function() {
      await setupDb()
      equal(await User.count({}), 0)
      await userLogic.addUser("Max","Mustermann","max.mustermann@mustermail.com","123",false)
      let error = false
      try{
        await userLogic.addUser("Alexander","Prinz","alexander.prinz@mustermail.com","123",false)
      } catch(e){
        error = true
      }
      equal(error, false)
      equal(await User.count({}), 2)
    });
    it('should have an inactive user after adding', async function() {
      await setupDb()
      equal(await User.count({}), 0)
      await userLogic.addUser("Max","Mustermann","max.mustermann@mustermail.com","123",false)
      equal(await User.count({}), 1)
      const max = await User.findOne({email: 'max.mustermann@mustermail.com'});
      notEqual(max, null)
      if ( max ) {
        equal(max.active, false)
        equal(max.firstName, "Max")
      }
    });
  });
  describe('Test registerUser', function() {
    it('should reister a user', async function() {
      await setupDb()
      equal(await User.count({}), 0)
      await userLogic.addUser("Max","Mustermann","max.mustermann@mustermail.com","123",false)
      equal(await User.count({}), 1)
      let max = await User.findOne({email: 'max.mustermann@mustermail.com'});
      notEqual(max, null)
      if ( !max ) {
        return
      }
      equal(max.active, false)
      await userLogic.registerUser(max)
      max = await User.findOne({email: 'max.mustermann@mustermail.com'});
      notEqual(max, null)
      if ( !max ) {
        return
      }
      equal(max.active, true)
    });
    describe('Test user login', function() {
      it('should not be possible to login with inactive user', async function() {
        await setupDb()
        equal(await User.count({}), 0)
        await userLogic.addUser("Max","Mustermann","max.mustermann@mustermail.com","123",false)
        let error = false
        try{
          await userLogic.login("max.mustermann@mustermail.com","123")
        } catch(e){
          error = true
        }
        equal(error, true)
      });
      it('should be possible to login with active user', async function() {
        await setupDb()
        equal(await User.count({}), 0)
        const max = await userLogic.addUser("Max","Mustermann","max.mustermann@mustermail.com","123",false)
        await userLogic.registerUser(max)
        let error = false
        let session = null
        try{
          session = await userLogic.login("max.mustermann@mustermail.com","123")
        } catch(e){
          error = true
        }
        equal(error, false)
        notEqual(session, null)
      });
      it('should not be possible to login with wrong password', async function() {
        await setupDb()
        equal(await User.count({}), 0)
        const max = await userLogic.addUser("Max","Mustermann","max.mustermann@mustermail.com","123",false)
        await userLogic.registerUser(max)
        let error = false
        let session = null
        try{
          session = await userLogic.login("max.mustermann@mustermail.com","1234")
        } catch(e){
          error = true
        }
        equal(error, true)
        equal(session, null)
      });
    });
  });
});
