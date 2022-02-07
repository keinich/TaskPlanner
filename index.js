import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import pool from "./db.js";
import taskRoutes from "./routes/tasksRoutes.js";
import userRoutes from "./routes/userRoutes.js";


import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
