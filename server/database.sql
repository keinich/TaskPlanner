-- CREATE DATABASE taskplanner;

DROP TABLE IF EXISTS public.tasks;

CREATE TABLE public.tasks(
  task_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255)
);