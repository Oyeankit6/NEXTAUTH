import mongoose from "mongoose";

export async function connect() {
  mongoose.connect(process.env.MONGO_URI);
  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("MongoDB Conected");
  });

  connection.on("error", () => {
    console.log("Mongon Connection Error:");
    process.exit();
  });

  try {
  } catch (error) {
    console.log("Somthing went wrong while connecting to Database");
  }
}
