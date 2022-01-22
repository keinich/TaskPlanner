import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import pool from "./db.js";
import taskRoutes from './routes/tasksRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();


// middleware
// app.use(bodyParser.json({ limit: "30mb", extenended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extenended: true }));
app.use(cors());
app.use(express.json());

 app.use('/tasks', taskRoutes);
 app.use('/user', userRoutes);

//ROUTES//

// create a task

// app.post("/tasks1", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newTask = await pool.query(
//       "INSERT INTO tasks (description) VALUES($1) RETURNING *",
//       [description]
//     );

//     // res.json(newTask.rows[0]);
//     res.json(req.body);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // get all tasks

// app.get("/tasks", async (req, res) => {
//   try {
//     const allTasks = await pool.query("SELECT * FROM public.tasks");
//     res.json(allTasks.rows);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// get a task

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query(
      "SELECT * FROM public.tasks WHERE task_id = $1",
      [id]
    );
    res.json(task.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// update a task

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTask = await pool.query(
      "UPDATE public.tasks SET description = $1 WHERE task_id = $2",
      [description, id]
    );
    res.json("Task was updated");
  } catch (error) {
    console.log(error.message);
  }
});

// delete a task

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query(
      "DELETE FROM public.tasks WHERE task_id = $1",
      [id]
    );
    res.json("Task was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
