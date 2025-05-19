import FormularioPreguntas from "../components/FormularioPreguntas";
import { useEffect, useState } from "react";
import {
  getQuestions,
  getAnswers,
  getResults,
  postResults,
} from "../client/api";
import ResumenRespuestas from "../components/ResumenRespuestas";
import EstadisticasQuiz from "../components/EstadisticasQuiz";
import InicioQuiz from "../components/InicioQuiz";

const Cuestionario = () => {
  const [name, setName] = useState("");
  const [quizId, setQuizId] = useState("");
  const [studentId, setStudentId] = useState(null);
  const [view, setView] = useState("inicio");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);

  const ObtenerPreguntas = async () => {
    const questions = await getQuestions(quizId);
    setQuestions(questions);
  };

  const ObtenerRespuestas = async () => {
    const respuestas = await getAnswers();
    setAnswers(respuestas);
  };

  const InsertarResultados = async () => {
    let correct = 0;
    let score = 0;
    answers.forEach((answer) => {
      if (answer.is_correct) {
        correct += 1;
      }
    });
    score = ((correct / answers.length) * 100).toFixed(2);

    postResults({
      student_id: studentId,
      quiz_id: quizId,
      score: score,
    });
  };

  const ObtenerResultadosIndividual = async () => {
    const resultados = await getResults(quizId, studentId);
    setResults(resultados[0]);
  };

  const handleStartQuiz = async (
    quizIdSelected,
    studentIdInputed,
    studentName,
  ) => {
    setQuizId(quizIdSelected);
    setStudentId(studentIdInputed);
    setName(studentName);
    setView("quiz");
  };

  const handleVolverInicio = () => {
    setView("inicio");
  };

  const handleFinishForm = () => {
    ObtenerRespuestas();
    InsertarResultados();
    setView("resumen");
  };

  const handleVerEstadisticas = () => {
    setView("estadisticas");
  };

  useEffect(() => {
    if (view === "quiz") {
      ObtenerPreguntas();
    } else if (view === "resumen") {
      ObtenerResultadosIndividual();
    }
  }, [view]);

  if (view === "inicio") {
    return (
      <div className="m-auto max-w-4xl min-w-3xl rounded-xl bg-indigo-900 p-10">
        <InicioQuiz onStartQuiz={handleStartQuiz} />
      </div>
    );
  }

  if (view === "resumen") {
    return (
      <div className="m-auto max-w-4xl min-w-3xl rounded-xl bg-indigo-900 p-10">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
              ¡Felicitaciones, {name}!
            </h2>
            <p className="mt-2 text-indigo-200">Prueba finalizada</p>
          </div>
          <ResumenRespuestas
            answers={answers}
            questions={questions}
            onVolverInicio={handleVolverInicio}
            onVerEstadisticas={handleVerEstadisticas}
          />
        </div>
      </div>
    );
  }

  if (view === "estadisticas") {
    return (
      <div className="m-auto max-w-4xl min-w-3xl rounded-xl bg-indigo-900 p-10">
        Estadísticas
        {/* <EstadisticasQuiz
          answers={answers}
          onVolverInicio={handleVolverInicio}
        /> */}
      </div>
    );
  }

  return (
    questions.length > 0 && (
      <>
        <div className="m-auto max-w-4xl min-w-3xl rounded-xl bg-indigo-900 p-10">
          <FormularioPreguntas
            studentId={studentId}
            questions={questions}
            onFinishForm={handleFinishForm}
          />
        </div>
      </>
    )
  );
};

export default Cuestionario;
