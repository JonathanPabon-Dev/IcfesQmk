import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const EstadisticasQuiz = ({ questions, results, onVolverInicio }) => {
  // Promedio general de puntaje (en %)
  const averageScore = results.length
    ? results.reduce((acc, curr) => acc + curr.score, 0) / results.length
    : 0;

  // Estadísticas por pregunta: porcentaje de selección por opción
  const getOptionStats = (questionIndex) => {
    const question = questions[questionIndex];
    if (!question) return [];
    return question.opciones.map((option) => {
      const selectedCount = results.filter(
        (r) => r.answers[questionIndex]?.selectedOptionId === option.id,
      ).length;
      return {
        option: option.texto,
        count: selectedCount,
        percentage: results.length ? (selectedCount / results.length) * 100 : 0,
      };
    });
  };

  // Estadísticas de tiempo por pregunta
  const getTimeStats = (questionIndex) => {
    const times = results
      .map((r) => r.answers[questionIndex]?.timeSpent)
      .filter((time) => typeof time === "number");
    if (times.length === 0) {
      return {
        averageTime: 0,
        fastestTime: 0,
        slowestTime: 0,
      };
    }
    return {
      averageTime: times.reduce((acc, curr) => acc + curr, 0) / times.length,
      fastestTime: Math.min(...times),
      slowestTime: Math.max(...times),
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Resumen Estadístico
      </h2>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-2 text-lg font-semibold">Datos Generales</h3>
          <p className="text-gray-700">
            Estudiantes evaluados: {results.length}
          </p>
          <p className="text-gray-700">
            Promedio general: {averageScore.toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-2 text-lg font-semibold">Mejores Puntuaciones</h3>
          {[...results]
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map((result, index) => (
              <p key={index} className="text-gray-700">
                {result.nombre}: {result.score.toFixed(1)}%
              </p>
            ))}
        </div>
      </div>
      <div className="space-y-8">
        {questions.map((question, qIndex) => {
          const stats = getOptionStats(qIndex);
          const timeStats = getTimeStats(qIndex);
          const chartData = {
            labels: question.opciones.map((o) => o.texto),
            datasets: [
              {
                data: stats.map((s) => s.percentage),
                backgroundColor: [
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                ],
                borderColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
              },
            ],
          };
          return (
            <div key={question.id} className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold">
                Pregunta {qIndex + 1}: {question.pregunta}
              </h3>
              <div className="mb-4 grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-3">
                <div>
                  <span className="font-medium">Tiempo promedio:</span>{" "}
                  {timeStats.averageTime.toFixed(1)}s
                </div>
                <div>
                  <span className="font-medium">Tiempo más rápido:</span>{" "}
                  {timeStats.fastestTime.toFixed(1)}s
                </div>
                <div>
                  <span className="font-medium">Tiempo más lento:</span>{" "}
                  {timeStats.slowestTime.toFixed(1)}s
                </div>
              </div>
              <div className="h-64">
                <Bar data={chartData} options={chartOptions} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <span className="font-medium">{stat.option}:</span>{" "}
                    {stat.count} estudiantes ({stat.percentage.toFixed(1)}%)
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={onVolverInicio}
        className="mt-8 w-full rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
      >
        Inicio
      </button>
    </div>
  );
};

export default EstadisticasQuiz;
