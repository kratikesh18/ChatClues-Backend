import express from "express";
import dotenv from "dotenv";
import connectToDB from "./DB/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const port = process.env.PORT || "4000";
const app = express();

dotenv.config({ path: "../.env" });
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v1/user", userRoutes);
app.use(errorHandler);
connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`app is listening to the port : http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("DB connection Failed", error);
  });
