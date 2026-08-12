import express, { json } from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const PORT = process.env.PORT;
const app = express();

app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
