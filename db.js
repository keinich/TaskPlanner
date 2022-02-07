import pg1 from "pg";

const Pool = pg1.Pool;

// const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "taskplanner",
});

export default pool;
