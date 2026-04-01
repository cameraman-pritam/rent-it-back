import { drizzle } from 'https://esm.sh/drizzle-orm@0.30.10/postgres-js';
import { pgTable, serial, text, varchar } from 'https://esm.sh/drizzle-orm@0.30.10/pg-core';
import postgres from 'https://esm.sh/postgres@3.4.4';

// Define the users schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: varchar('email', { length: 256 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
});

// Get the connection string from the environment
const databaseUrl = Deno.env.get('DATABASE_URL');
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in the environment.");
}

// Create the connection client
const client = postgres(databaseUrl);

// Initialize Drizzle
export const db = drizzle(client, { schema: { users } });
