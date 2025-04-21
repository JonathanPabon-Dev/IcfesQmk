import React, { useEffect, useState } from "react";

const ModalTransicionPregunta = ({ visible, onFinish, esUltima }) => {
  const [contador, setContador] = useState(3);

  useEffect(() => {
    if (!visible || esUltima) return;
    setContador(3);
    const interval = setInterval(() => {
      setContador((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onFinish && onFinish();
          return 1;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [visible, esUltima, onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="flex flex-col items-center justify-center bg-indigo-950/90 rounded-xl p-10 shadow-2xl min-w-[320px] min-h-[220px]">
        <h2 className="text-3xl font-bold text-white mb-6 animate-pulse">
          {esUltima ? "Has terminado" : "Siguiente Pregunta"}
        </h2>
        {!esUltima && (
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="absolute top-0 left-0" width="96" height="96">
              <circle
                cx="48"
                cy="48"
                r="42"
                stroke="#6366f1"
                strokeWidth="10"
                fill="none"
                opacity="0.2"
              />
              <circle
                cx="48"
                cy="48"
                r="42"
                stroke="#6366f1"
                strokeWidth="10"
                fill="none"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={(2 * Math.PI * 42 * (3 - contador)) / 3}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <span className="text-5xl font-bold text-indigo-200 z-10">{contador}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalTransicionPregunta;
