DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

DROP TABLE IF EXISTS public.tasks;

CREATE TABLE public.tasks(
  task_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  user_id VARCHAR(255)
);