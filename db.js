import pg1 from "pg";
import * as dotenv from 'dotenv';

const env = dotenv.config().parsed;
const Pool = pg1.Pool;

console.log("env", env);
console.log("process.env", process.env);
console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);

const devConfig = {
  user: env?.PG_USER,
  password: env?.PG_PASSWORD,
  host: env?.PG_HOST,
  port: env?.PG_PORT,
  database: env?.PG_DATABASE,
}

const prodConfig = {
  connectionString: process.env.DATABASE_URL, // heroku addon
  ssl: { rejectUnauthorized: false }
}

console.log("prodConfig", prodConfig);
const pool = new Pool(prodConfig);

export default pool;
