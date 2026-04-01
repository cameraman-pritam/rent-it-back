# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Setup and Running the Project

This project now uses a custom PostgreSQL backend powered by a Supabase Edge Function for authentication.

### 1. Database Setup

You need a PostgreSQL database that your Supabase project can connect to. You can use a new Supabase database or connect to an existing one.

In your database, run the following SQL query to create the necessary `users` table:

```sql
CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name text,
  last_name text,
  email varchar(256) UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

### 2. Supabase Setup

**A. Install the Supabase CLI**

If you haven't already, install the Supabase CLI:
```bash
npm install -g supabase
```

**B. Log in to Supabase**

```bash
supabase login
```

**C. Link Your Project**

Navigate to the root of this project directory in your terminal and link it to your Supabase project. Replace `<YOUR_PROJECT_REF>` with your actual project reference from the Supabase dashboard.

```bash
supabase link --project-ref <YOUR_PROJECT_REF>
```

**D. Deploy the Edge Function**

Deploy the `auth-api` function:

```bash
supabase functions deploy auth-api
```
This command bundles your function and deploys it to the Supabase infrastructure.

### 3. Frontend Configuration

**A. Set Your Project Reference**

Open the `src/utils/db.js` file and replace the placeholder `<YOUR_PROJECT_REF>` with your actual Supabase project reference.

```javascript
// src/utils/db.js

// Before:
const SUPABASE_PROJECT_REF = '<YOUR_PROJECT_REF>';

// After (example):
const SUPABASE_PROJECT_REF = 'abcdefg12345';
```

**B. Install Dependencies**

```bash
npm install
```

### 4. Running the Application

Once the database and backend function are set up, you can run the frontend development server:

```bash
npm run dev
```

Your application should now be running, and the login/signup forms will communicate with your new Supabase Edge Function.
