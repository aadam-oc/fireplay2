export default function HomePage() {
  return (
    <div className="space-y-12 px-6 py-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Fireplay</h1>
        <p className="text-lg mb-6">Tu tienda digital de videojuegos</p>
        <a href="/games" className="bg-blue-600 text-white px-4 py-2 rounded">Explorar juegos</a>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">¿Qué es Fireplay?</h2>
        <p>Una tienda virtual de videojuegos donde puedes explorar, valorar, y guardar tus favoritos.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">¿Cómo funciona?</h2>
        <ol className="list-decimal ml-6 space-y-2">
          <li>Regístrate y accede a tu cuenta</li>
          <li>Explora el catálogo de juegos</li>
          <li>Guarda favoritos o añade al carrito</li>
        </ol>
      </section>
    </div>
  );
}
