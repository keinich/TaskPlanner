import pool from "../db.js";

export const getProjects = async (req, res) => {
  try {
    if (!req.userId) return res.json({ message: "Unauthanticated" });
    const allTasks = await pool.query(
      "SELECT * FROM public.projects where user_id = $1",
      [req.userId]
    );

    res.status(200).json(allTasks.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    console.log("body", req.body);
    const { project_name } = req.body;
    if (!req.userId) return res.json({ message: "Unauthanticated" });

    console.log("req.userId", req.userId);

    const newProjectQuery = await pool.query(
      "INSERT INTO projects (project_name, user_id) VALUES($1,$2) RETURNING *",
      [project_name, req.userId]
    );

    res.status(201).json(newProjectQuery.rows[0]);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
