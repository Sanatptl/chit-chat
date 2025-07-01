import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      // useNewUrlParser: true,
      //   useUnifiedTopology: true, //Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
    });
    console.log("Database connected successfully ", conn.connection.host);
  } catch (err) {
    console.log("Database connection failed: ", err.message);
  }
}

export default connectDB;
