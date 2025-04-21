export const getPreguntas = async () => {
  try {
    const response = await fetch("./info.json");
    const data = await response.json();
    const prueba = data.prueba;
    return prueba;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
};
