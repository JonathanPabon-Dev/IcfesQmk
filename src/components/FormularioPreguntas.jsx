import { useState, useEffect } from "react";
import CuentaAtras from "./CuentaAtras";
import Pregunta from "./Pregunta";
import ResumenRespuestas from "./ResumenRespuestas";
import EstadisticasQuiz from "./EstadisticasQuiz";
import InicioQuiz from "./InicioQuiz";
import ModalTransicionPregunta from "./ModalTransicionPregunta";

const FormularioPreguntas = ({ preguntas }) => {
  
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [key, setKey] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [view, setView] = useState("inicio");
  const [nombre, setNombre] = useState("");
  const [showModalTransicion, setShowModalTransicion] = useState(false);
  const [esUltimaPregunta, setEsUltimaPregunta] = useState(false);
  const [respuestaGuardada, setRespuestaGuardada] = useState(false);

  const handleSendResponse = () => {
    if (respuestaGuardada) return;
    setAnswers(prev => [...prev, { question: currentQuestion.pregunta, selectedOptionId }]);
    setRespuestaGuardada(true);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setMinutes(0);
      setSeconds(10);
      setKey((prevKey) => prevKey + 1);
      setEsUltimaPregunta(false);
      setShowModalTransicion(true);
    } else {
      setCurrentQuestionIndex(null);
      setView("resumen");
      setEsUltimaPregunta(true);
      setShowModalTransicion(true);
    }
  };

  const handleSelectedOption = (optionId) => {
    setSelectedOptionId(optionId);
  };

  const handleFinishTime = () => {
    handleSendResponse();
  };

  useEffect(() => {
    setCurrentQuestion(preguntas[currentQuestionIndex]);
    setSelectedOptionId(null);
    setRespuestaGuardada(false);
  }, [preguntas, currentQuestionIndex]);

  useEffect(() => {
    setTotalQuestions(preguntas ? preguntas.length : 0);
  }, [preguntas]);

  const handleStartQuiz = (nombreUsuario) => {
    setNombre(nombreUsuario);
    setView("quiz");
    setCurrentQuestion(preguntas[0]);
  };

  const handleVolverInicio = () => {
    setView("inicio");
    setCurrentQuestionIndex(0);
    setCurrentQuestion(null);
    setSelectedOptionId(null);
    setAnswers([]);
  };

  const handleVerEstadisticas = () => {
    setView("estadisticas");
  };

  const handleFinTransicion = () => {
    setShowModalTransicion(false);
    if (esUltimaPregunta) {
      setCurrentQuestionIndex(null);
      setView("resumen");
    }
  };

  if (view === "inicio") {
    return <InicioQuiz onStartQuiz={handleStartQuiz} />;
  }
  
  if (view === "resumen") {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
            ¡Felicitaciones, {nombre}!
          </h2>
          <p className="mt-2 text-indigo-200">Prueba finalizada</p>
        </div>
        <ResumenRespuestas answers={answers} preguntasOriginales={preguntas} onVolverInicio={handleVolverInicio} onVerEstadisticas={handleVerEstadisticas} />
      </div>
    );
  }
  
  if (view === "estadisticas") {
    console.log("estadisticas");
    return (
      <EstadisticasQuiz
        answers={answers}
        onVolverInicio={handleVolverInicio}
      />
    );
  }

  return (
    <>
      <div className="flex min-h-[60vh] flex-col gap-8 rounded-xl bg-indigo-950/50 p-8 shadow-xl backdrop-blur-sm">
        <div className="flex w-full items-center justify-between rounded-lg bg-indigo-900/20 px-6 py-4">
          <div className="flex items-center gap-3">
            <p className="text-lg text-indigo-200">
              Pregunta{" "}
              <span className="font-semibold text-indigo-300">{currentQuestionIndex + 1}</span>{" "}
              de{" "}
              <span className="font-semibold text-indigo-300">{totalQuestions}</span>
            </p>
          </div>
          <CuentaAtras
            key={key}
            minutes={minutes}
            seconds={seconds}
            onTimeFinish={handleFinishTime}
          />
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <Pregunta
            pregunta={currentQuestion?.pregunta}
            opciones={currentQuestion?.opciones}
            onSelect={handleSelectedOption}
            selectedOptionId={selectedOptionId}
          />
          <button
            type="button"
            onClick={handleSendResponse}
            className="group relative w-fit overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:cursor-pointer hover:from-indigo-600 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={selectedOptionId == null}
          >
            <span className="relative z-10">Enviar respuesta</span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-indigo-600 to-indigo-700 transition-transform duration-200 group-hover:translate-x-0"></div>
          </button>
        </div>
      </div>
      <ModalTransicionPregunta
        visible={showModalTransicion}
        onFinish={handleFinTransicion}
        esUltima={esUltimaPregunta}
      />
    </>
  );
  
};

export default FormularioPreguntas;
