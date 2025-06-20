import dotenv from "dotenv";
dotenv.config();
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
let server: Server;
const PORT = 5000;
async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gsjmw27.mongodb.net/library-management-app?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Connected to MongoDB");
    server = app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
