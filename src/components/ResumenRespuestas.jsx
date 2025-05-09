import React from "react";

const ResumenRespuestas = ({ answers, preguntasOriginales, onVolverInicio, onVerEstadisticas }) => {
  
  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-lg bg-indigo-900/20 px-6">
        <div className="space-y-4">
          {answers.map((answer, index) => {
            const preguntaOriginal = preguntasOriginales && preguntasOriginales[index];
            const esCorrecta = preguntaOriginal && answer.selectedOptionId === preguntaOriginal.respuestaCorrecta;
            const textoSeleccionado = preguntaOriginal?.opciones.find(o => o.id === answer.selectedOptionId)?.texto || '';
            const textoCorrecto = preguntaOriginal?.opciones.find(o => o.id === preguntaOriginal.respuestaCorrecta)?.texto || '';

            return (
              <div
                key={index}
                className="rounded-lg border border-indigo-500/30 bg-indigo-950/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-indigo-500/50"
              >
                <h3 className="text-lg font-medium text-indigo-200">Pregunta {index + 1}</h3>
                <p className="mt-1 text-indigo-100">{answer.question}</p>
                <div className="mt-4 rounded-md p-3 bg-indigo-500/10">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-indigo-300 mr-2">Tu respuesta:</span>
                    <span className={`flex-1 ${esCorrecta ? 'text-green-200' : 'text-red-200'} font-semibold`}>{textoSeleccionado}</span>
                    {esCorrecta ? (
                      <svg className="w-6 h-6 ml-2 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-6 h-6 ml-2 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </div>
                </div>
                {!esCorrecta && (
                  <div className="mt-4 rounded-md p-3 bg-indigo-500/10">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-indigo-300 mr-2">Respuesta correcta:</span>
                      <span className={`flex-1 text-green-200 font-semibold`}>{textoCorrecto}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex items-center gap-2 justify-center">
        <button
          onClick={onVolverInicio}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:cursor-pointer hover:from-indigo-600 hover:to-indigo-700"
        >
          <span className="relative z-10">Inicio</span>
          <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-indigo-600 to-indigo-700 transition-transform duration-200 group-hover:translate-x-0"></div>
        </button>
        {onVerEstadisticas && (
          <button
            onClick={onVerEstadisticas}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:cursor-pointer hover:from-indigo-600 hover:to-indigo-700"
          >
            Estadísticas
          </button>
        )}
      </div>
    </div>
  );

};

export default ResumenRespuestas;