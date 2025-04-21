import FormularioPreguntas from "../components/FormularioPreguntas";
import { useEffect, useState } from "react";
import { getPreguntas } from "../client/api";

const Cuestionario = () => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    (async () => {
      const preguntas = await getPreguntas();
      setPreguntas(preguntas);
    })();
  }, []);

  return (
    <>
      <div className="m-auto max-w-4xl min-w-3xl rounded-xl bg-indigo-900 p-10">
        <FormularioPreguntas preguntas={preguntas} />
      </div>
    </>
  );
};

export default Cuestionario;
