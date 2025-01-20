import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import slotRoutes from "./routes/parkingLotRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use("/admin", adminRouter);
app.use("/slots", slotRoutes);


server.listen(9000, () => console.log("Server started at PORT: 9000"));
