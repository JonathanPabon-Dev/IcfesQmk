import React from "react";
// Si se instala chart.js, descomentar:
import { Bar, Pie } from 'react-chartjs-2';

const EstadisticasQuiz = ({ answers, onVolverInicio }) => {
  // Calcular tiempos promedio por pregunta
  const tiempos = answers.map(a => a.responseTime || 0); // responseTime en segundos
  const promedio = tiempos.length ? (tiempos.reduce((a, b) => a + b, 0) / tiempos.length) : 0;

  // Calcular puntaje
  const total = answers.length;
  const correctas = answers.filter(a => a.isCorrect).length;

  // Datos para gráficos (si se usa chart.js o similar)
  const dataBarras = {
    labels: answers.map((_, idx) => `Pregunta ${idx + 1}`),
    datasets: [{
      label: 'Tiempo de respuesta (s)',
      data: tiempos,
      backgroundColor: 'rgba(99,102,241,0.7)',
    }]
  };
  const dataPie = {
    labels: ['Correctas', 'Incorrectas'],
    datasets: [{
      data: [correctas, total - correctas],
      backgroundColor: ['#4ade80', '#f87171']
    }]
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="rounded-lg bg-indigo-900/20 p-6 text-center">
          <h2 className="text-2xl font-bold text-indigo-200 mb-4">Estadísticas del Quiz</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="w-full md:w-1/2">
              <h3 className="font-semibold text-indigo-300 mb-2">Tiempo promedio de respuesta</h3>
              <Bar data={dataBarras} />
              <ul className="text-indigo-100 text-left">
                {answers.map((a, idx) => (
                  <li key={idx}>
                    Pregunta {idx + 1}: {a.responseTime ? `${a.responseTime.toFixed(2)}s` : 'N/A'}
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-indigo-300">Promedio: {promedio.toFixed(2)}s</div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="font-semibold text-indigo-300 mb-2">Puntaje general</h3>
              <Pie data={dataPie} />
              <div className="text-indigo-100 text-lg">
                {correctas} / {total} correctas
              </div>
              <div className="mt-2">
                <span className="inline-block rounded bg-green-500/80 px-3 py-1 text-white font-semibold">
                  {((correctas / (total || 1)) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onVolverInicio}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:cursor-pointer hover:from-indigo-600 hover:to-indigo-700"
          >
            <span className="relative z-10">Volver al inicio</span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-indigo-600 to-indigo-700 transition-transform duration-200 group-hover:translate-x-0"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasQuiz;
