import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.MCSPENCER_DB_URL ?? process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: false,
  max: 10,
  idleTimeoutMillis: 30000,
});

export default pool;

export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T[];
  } finally {
    client.release();
  }
}
