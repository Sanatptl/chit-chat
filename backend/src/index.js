import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db_config/dbConfig.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

// dotenv.config({ path: "../.env" });
dotenv.config({ path: "./.env" });
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = { origin: "http://localhost:5173", credentials: true };
app.use(cors(corsOptions));

// Use cookie-parser middleware
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res) => res.send("<h1>hello from server</h1>"));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
// app.use

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
