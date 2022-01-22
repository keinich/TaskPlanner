DROP TABLE IF EXISTS public.tasks;

DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users(
  user_id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) null,
  first_name VARCHAR(255) null,
  last_name VARCHAR(255) null,
  email VARCHAR(255) not null,
  password VARCHAR(255)
);

CREATE TABLE public.tasks(
  task_id SERIAL PRIMARY KEY,
  name VARCHAR(255) not null,
  description VARCHAR(255),
  user_id int not null,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
);