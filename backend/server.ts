import express from "express";
import cors from "cors";
import notesRoutes from "./routes/postsRoutes";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS (dev only)
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "*" }));
}

app.use(express.json());
app.use("/api/posts", notesRoutes);

// STATIC FRONTEND SERVE
const frontendPath = path.join(__dirname, "../frontend/dist");

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
app.listen(PORT, () =>
  console.log(`✅ Backend running → http://localhost:${PORT}`)
);
