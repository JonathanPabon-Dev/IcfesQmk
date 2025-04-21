import React, { useState } from "react";

const InicioQuiz = ({ onStartQuiz }) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      onStartQuiz(nombre);
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 rounded-xl bg-indigo-950/50 p-8 shadow-xl backdrop-blur-sm">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent">
          Bienvenido
        </h1>
        <p className="mt-2 text-indigo-200">Prepárate para poner a prueba tus conocimientos</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="w-full">
          <label htmlFor="nombre" className="mb-2 block text-lg font-medium text-indigo-300">
            ¿Cuál es tu nombre?
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-lg border-2 border-indigo-500/30 bg-indigo-950/50 px-4 py-3 text-indigo-100 placeholder-indigo-400 shadow-inner transition-colors duration-200 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            placeholder="Escribe tu nombre aquí"
            required
          />
        </div>
        <button
          type="submit"
          className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:cursor-pointer hover:from-indigo-600 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!nombre.trim()}
        >
          <span className="relative z-10">Iniciar prueba</span>
          <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-indigo-600 to-indigo-700 transition-transform duration-200 group-hover:translate-x-0"></div>
        </button>
      </form>
    </div>
  );
};

export default InicioQuiz;
