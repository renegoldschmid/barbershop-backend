import { connect, model, Schema } from "mongoose";

class DB  {

  /**
   * Setting up the database
   * @param  dbConfig Config of the databaes
   * @return          database instance
   */
  public setup = async (mongodbConnectionString: string) =>{

    try {
      await connect(mongodbConnectionString)
      console.log("Successfully Connected!");
    } catch (err) {
      console.log(err.message);
    }
    console.log("testibär")
  }
}
const db = new DB()
export default db;
export {db}
