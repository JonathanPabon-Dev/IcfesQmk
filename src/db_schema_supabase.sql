-- Esquema sugerido para Supabase (Postgres)
-- Tabla para guardar resultados de quizzes
create table if not exists resultados (
  id serial primary key,
  nombre_usuario text,
  respuestas jsonb,
  puntaje integer,
  correctas integer,
  total integer,
  tiempo_promedio real,
  creado_en timestamp with time zone default timezone('America/Bogota', now())
);
