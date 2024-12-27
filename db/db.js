import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;

dotenv.config();

export const db = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  user: "postgrestest",
  host: "rds-test-database.cvcu4u4sysuk.ap-southeast-1.rds.amazonaws.com",
  database: "rds_db_initial",
  password: "Test123321!",
  port: 5432,
  ssl: false,
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to database successfully");
  }
});
