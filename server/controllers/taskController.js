import pool from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM public.tasks");

    res.status(200).json(allTasks.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    console.log("body", req.body);
    const { description, name } = req.body;
    if (!req.userId) return res.json({ message: "Unauthanticated" });

    const newTask = await pool.query(
      "INSERT INTO tasks (name, description, user_id, done) VALUES($1,$2,$3,false) RETURNING *",
      [name, description, req.userId]
    );

    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// tasks/1
export const updateTask = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthanticated" });

  const { id } = req.params;

  const existingTaskQuery = await pool.query(
    "select * from public.tasks where task_id = $1 limit 1",
    [id]
  );

  // console.log("existing task", existingTaskQuery);
  const { description, name, done, due_date } = req.body;

  if (existingTaskQuery.rows.length === 0) {
    return res.status(404).send("No task with given id");
  }

  const updatedTaskQuery = await pool.query(
    "update tasks set name = $2, description = $3, done = $4, due_date = $5 where task_id = $1 RETURNING *",
    [id, name, description, done, due_date]
  );
  return res.status(200).json(updatedTaskQuery.rows[0]);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthanticated" });

  const existingTaskQuery = await pool.query(
    "select * from public.tasks where task_id = $1 limit 1",
    [id]
  );

  const { description, name } = req.body;

  if (existingTaskQuery.rows.length === 0) {
    return res.status(404).send(`No task with given id ${id}`);
  }

  const deletedTaskQuery = await pool.query(
    "delete from tasks where task_id = $1",
    [id]
  );
  return res.status(200).send("Task deleted");
  // return res.status(200).json(existingTaskQuery);
};
