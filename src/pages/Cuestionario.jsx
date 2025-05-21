import FormularioPreguntas from "../components/FormularioPreguntas";
import { useEffect, useState } from "react";
import {
  getQuestions,
  getAnswers,
  getResults,
  postResults,
  getParameters,
} from "../client/api";
import ResumenRespuestas from "../components/ResumenRespuestas";
import EstadisticasQuiz from "../components/EstadisticasQuiz";
import InicioQuiz from "../components/InicioQuiz";

const Cuestionario = () => {
  const [seconds, setSeconds] = useState(0);
  const [name, setName] = useState("");
  const [quizId, setQuizId] = useState("");
  const [studentId, setStudentId] = useState(null);
  const [view, setView] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);

  const ObtenerTiempoQuiz = async () => {
    const quizTime = await getParameters("segundosIcfesQuiz");
    setSeconds(quizTime.value);
  };

  const ObtenerPreguntas = async () => {
    const questionsTemp = await getQuestions(quizId);
    setQuestions(questionsTemp);
  };

  const InsertarResultados = async (answersList) => {
    let correct = 0;
    let score = 0;

    answersList.forEach((item) => {
      if (item.is_correct) {
        correct += 1;
      }
    });
    score = ((correct / answersList.length) * 100).toFixed(2);
    await postResults({
      student_id: studentId,
      quiz_id: quizId,
      score: score,
    });
  };

  const ObtenerResultadosIndividual = async () => {
    const resultsData = await getResults(quizId, studentId);
    setResults(resultsData[0]);
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

  const handleStartView = () => {
    setView("start");
  };

  const handleFinishForm = async () => {
    const answersData = await getAnswers(quizId, studentId);
    setAnswers(answersData);
    await InsertarResultados(answersData);
    await ObtenerResultadosIndividual();
    setView("summary");
  };

  const handleStatisticsView = () => {
    setView("statistics");
  };

  useEffect(() => {
    if (view == "quiz") {
      ObtenerTiempoQuiz();
      ObtenerPreguntas();
    }
  }, [view]);

  if (view === "start") {
    return (
      <div className="m-auto max-w-4xl min-w-3xl rounded-xl bg-indigo-900 p-10">
        <InicioQuiz onStartQuiz={handleStartQuiz} />
      </div>
    );
  }

  if (view === "summary") {
    return (
      <div className="m-auto max-w-4xl min-w-3xl rounded-xl bg-indigo-900 p-10">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
              ¡Felicitaciones, {name.split(" ")[0]}!
            </h2>
            <p className="mt-2 text-xl font-bold text-indigo-400">
              Prueba finalizada
            </p>
          </div>
          <ResumenRespuestas
            answers={answers}
            questions={questions}
            results={results}
            onStart={handleStartView}
            onStatistics={handleStatisticsView}
          />
        </div>
      </div>
    );
  }

  if (view === "statistics") {
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
      <div className="m-auto max-w-4xl min-w-3xl rounded-xl bg-indigo-900 p-10">
        <FormularioPreguntas
          studentId={studentId}
          quizId={quizId}
          questions={questions}
          quizTime={seconds}
          onFinishForm={handleFinishForm}
        />
      </div>
    )
  );
};

export default Cuestionario;
