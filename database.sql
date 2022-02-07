DROP TABLE IF EXISTS public.tasks;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.project_lists;
DROP TABLE IF EXISTS public.projects;

CREATE TABLE public.projects(
  project_id SERIAL PRIMARY KEY,  
  project_name VARCHAR(255) null
);

CREATE TABLE public.project_lists(
  project_list_id SERIAL PRIMARY KEY,  
  project_list_name VARCHAR(255) null,
  project_id int not null,
  CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(project_id)
);

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
  project_list_id int null,
  due_date timestamp with time zone null,
  done boolean not null,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id),
  CONSTRAINT fk_project_list FOREIGN KEY(project_list_id) REFERENCES project_lists(project_list_id)
);