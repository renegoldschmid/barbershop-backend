import { model, Schema, Document } from "mongoose";
import { IUser} from "./"

const BookingSchema = new Schema({
  date:  { type: Date, required: true },
  type: { type: String, required: true },
  storeId: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

interface IBooking extends Document {
  date:  Date;
  type: string;
  storeId: Number;
  userId: IUser["_id"];
};

const Booking = model<IBooking>("Booking", BookingSchema);
export default Booking;
export {BookingSchema, Booking, IBooking}
