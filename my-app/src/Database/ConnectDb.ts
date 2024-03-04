{
  /*
   * author: sultan ahmed sanjar
   * date : 01-03-2024
   * description : this file will handle the  connection with mongoose and whenever the connectdb function will be called it will establish a connection with mongo database
   */
}

// dependencies
// track the connection
let isConnected = false;
import { configDotenv } from "dotenv";
// external imports
import mongoose from "mongoose";
configDotenv();
export const ConnectDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Already connected");
  }
  const MongoUrl = process.env.MONGO_URL;
  if (MongoUrl) {
    try {
      await mongoose.connect(MongoUrl, {
        dbName: "todo-app",
      });
      isConnected = true;
      console.log("Successfully connected to the database");
    } catch (error) {}
  }
};
