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

    const { description, name } = req.body;
    if (!req.userId) return res.json({message: 'Unauthanticated'});    
   
    const newTask = await pool.query(
      "INSERT INTO tasks (name, description, user_id) VALUES($1,$2,$3) RETURNING *",
      [name, description, req.userId]
    );

    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
