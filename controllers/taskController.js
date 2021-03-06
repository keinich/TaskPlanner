import pool from "../db.js";

export const getTasks = async (req, res) => {
  try {
    if (!req.userId) return res.json({ message: "Unauthanticated" });
    const allTasks = await pool.query(
      "SELECT * FROM public.tasks where user_id = $1 order by priority",
      [req.userId]
    );

    res.status(200).json(allTasks.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    console.log("body", req.body);
    const { description, name, due_date } = req.body;
    if (!req.userId) return res.json({ message: "Unauthanticated" });

    const maxPriorityQuery = await pool.query(
      "select max(priority) from public.tasks"
    );
    console.log("maxPriorityQuery", maxPriorityQuery);

    const newTask = await pool.query(
      "INSERT INTO tasks (name, description, user_id, done, due_date, priority, active) VALUES($1,$2,$3,false,$4,$5,true) RETURNING *",
      [
        name,
        description,
        req.userId,
        due_date,
        maxPriorityQuery.rows[0].max === null
          ? 0
          : maxPriorityQuery.rows[0].max + 1,
      ]
    );

    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePriosDown = async (prio) => {
  await pool.query(
    `update tasks t1 set priority = t1.priority - 1 \
    where \
    t1.priority = ${prio} or \
    (t1.priority < ${prio} and t1.priority + 1 = (select min(t.priority) from tasks t where t.priority > t1.priority))`
  );
};

const updatePriosUp = async (prio) => {
  await pool.query(
    `update tasks t1 set priority = t1.priority + 1 \
    where \
    t1.priority = ${prio} or \
    (t1.priority > ${prio} and t1.priority - 1 = (select max(t.priority) from tasks t where t.priority < t1.priority))`
  );
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
  const { description, name, done, due_date, priority, active } = req.body;

  if (existingTaskQuery.rows.length === 0) {
    return res.status(404).send("No task with given id");
  }

  const currentPriority = existingTaskQuery.rows[0].priority;
  if (currentPriority < priority) {
    await updatePriosDown(priority);
  } else if (currentPriority > priority) {
    await updatePriosUp(priority);
  }
  
  const updatedTaskQuery = await pool.query(
    "update tasks set name = $2, description = $3, done = $4, due_date = $5, priority = $6, active = $7 where task_id = $1 RETURNING *",
    [id, name, description, done, due_date, priority, active]
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
