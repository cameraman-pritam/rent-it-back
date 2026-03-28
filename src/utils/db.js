import postgres from "postgres";

const connectionString = import.meta.env.VITE_DATABASE_URL;
const sql = postgres(connectionString);

export default sql;
