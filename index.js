import express from "express";
import dotenv from "dotenv";
import connectToDB from "./DB/index.js";

const port = process.env.PORT || "4000";
const app = express();
dotenv.config();


connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`app is listening to the port : http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("DB connection Failed", error);
  });
