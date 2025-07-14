export default function CatalogoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Catálogo de Productos</h1>
      <div className="bg-gradient-to-r from-blue-800 to-purple-900 text-white p-12 rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-6">CATÁLOGO DIGITAL</h2>
        <p className="text-xl mb-8">Explora nuestro catálogo completo de productos</p>
        <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors">
          DESCARGAR CATÁLOGO
        </button>
      </div>
    </main>
  )
}
