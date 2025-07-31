import express from "express";
import { app, server } from "./lib/socket.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db_config/dbConfig.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: "./.env" });
connectDB();
const PORT = process.env.PORT || 5000;
// const app = express();

const corsOptions = { origin: "http://localhost:5173", credentials: true };
app.use(cors(corsOptions));

// Use cookie-parser middleware
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
