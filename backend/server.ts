import express from "express";
import cors from "cors";
import notesRoutes from "./routes/postsRoutes";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api/posts", notesRoutes);
app.listen(5000, () =>
  console.log(`Backend running → http://localhost:${PORT}`)
);
