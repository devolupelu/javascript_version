import mongoose from "mongoose";

const connect_now = async (connection) => {
  try {
    await mongoose.connect(connection);
    console.log("Connected");
  } catch (er) {
    console.error("Error connecting to MongoDB:", er);
    throw er; // Re-throw to let the caller handle it
  }
};
export default connect_now;
