import { model, Schema, Document } from "mongoose";

const BookingTypeSchema = new Schema({
  type: { type: String, required: true },
  duration: { type: Number, required: true }
});

interface IBookingType extends Document {
  type: string;
  duration: number;
};

const BookingType = model<IBookingType>("BookingType", BookingTypeSchema);
export default BookingType;
export {BookingTypeSchema, BookingType, IBookingType}
