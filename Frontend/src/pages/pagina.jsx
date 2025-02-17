// Aqui va una pagina react
function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Bienvenido a EDUNEG</h1>
      <p className="text-lg text-gray-700 mb-6">
        Aquí puedes comprar el uso de nuestros servicios de educación en línea.
      </p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Comprar Ahora
      </button>
    </div>
  );
}

export default Home
