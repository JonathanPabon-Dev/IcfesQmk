import supabase from "../supabase/supabaseClient";

export const getQuestions = async (quizId) => {
  const { data, error } = await supabase
    .from("questions")
    .select()
    .eq("quiz_id", quizId);
  if (error) {
    console.error("Error al obtener las preguntas.", error);
    return null;
  }
  return data;
};

export const getAnswers = async () => {
  const { data, error } = await supabase.from("answers").select();
  if (error) {
    console.error("Error al obtener las respuestas.", error);
    return null;
  }
  return data;
};

export const postAnswer = async (answer) => {
  const { error } = await supabase.from("answers").insert(answer);
  if (error) {
    console.error("Error al agregar la respuesta.", error);
    return null;
  }
};

export const getResults = async (quizId = "", studentId = null) => {
  let query = supabase.from("quiz_results").select();
  if (quizId !== "") {
    query = query.eq("quiz_id", quizId);
  }
  if (studentId !== null) {
    query = query.eq("student_id", studentId);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Error al obtener los resultados del quiz.", error);
    return null;
  }
  return data;
};

export const postResults = async (result) => {
  const { error } = await supabase.from("quiz_results").insert(result);
  if (error) {
    console.error("Error al agregar los resultados del quiz.", error);
    return null;
  }
};

export const getQuizzes = async (grade_level) => {
  const date = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("quizzes")
    .select()
    .lte("available_since", date)
    .gte("available_until", date)
    .eq("grade_level", grade_level);
  if (error) {
    console.error("Error al obtener el listado de quices.", error);
    return null;
  }
  return data;
};

export const getStudentById = async (studentId) => {
  const { data, error } = await supabase
    .from("students")
    .select()
    .eq("id", studentId);
  if (error) {
    console.error("Error al obtener el estudiante.", error);
    return null;
  }
  return data;
};
