import pool from "../db.js";

export const getProjectLists = async (req, res) => {
  try {
    if (!req.userId) return res.json({ message: "Unauthanticated" });

    const { project_id } = req.params;

    console.log("getProjectLists", project_id);

    const projectListsQuery = await pool.query(
      "SELECT * FROM public.project_lists where project_id = $1",
      [project_id]
    );

    console.log("projectListController returning lists", projectListsQuery.rows);
    res.status(200).json(projectListsQuery.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProjectList = async (req, res) => {
  try {
    console.log("body", req.body);
    if (!req.userId) return res.json({ message: "Unauthanticated" });
    const { project_id, project_list_name } = req.body;

    console.log("createProjectList", { project_id, project_list_name });
    const newProjectListQuery = await pool.query(
      "INSERT INTO project_lists (project_id, project_list_name) VALUES($1,$2) RETURNING *",
      [project_id, project_list_name]
    );
    console.log("newProjectListQuery", newProjectListQuery);

    res.status(201).json(newProjectListQuery.rows[0]);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
