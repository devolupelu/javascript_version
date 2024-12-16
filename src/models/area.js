import mongoose, { Schema } from "mongoose";

const AreaSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

export default  mongoose.model("Area", AreaSchema);
