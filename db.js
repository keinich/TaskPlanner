import pg1 from "pg";
import * as dotenv from 'dotenv';

const env = dotenv.config().parsed;
const Pool = pg1.Pool;

const devConfig = {
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  host: env.PG_HOST,
  port: env.PG_PORT,
  database: env.PG_DATABASE,
}

const prodConfig = {
  connectionString: process.env.DATABASE_URL // heroku addon
}

// console.log("env", env.NODE_ENV);
const pool = new Pool(env.NODE_ENV === "production" ? prodConfig : devConfig);

export default pool;
