import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToMongo from "./config/mongo.js";
import productRouter from "./routes/product-router.js";
import userRouter from "./routes/user-router.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

const app = express();
dotenv.config();
connectToMongo();
app.use(bodyParser.json());
app.use(cors());
app.use("/images", express.static("public/avatar"));
app.use("/allImages", express.static("public/AllImages"));
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/", ...swaggerMiddleware());

app.listen(process.env.PORT || 3000);
