import { useEffect, useState } from 'react';
import axios from 'axios';

function PaginaPrincipal() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function obtenerProductos() {
      const response = await axios.get('https://kardex.seuz716.repl.co/api/productos/obtenerProductos');
      setProductos(response.data.data[0].productos);
    }
    obtenerProductos();
  }, []);

  return (
    <main className="container">
      <h1 className="display-4">Listado de Productos</h1>
      {productos.map((producto) => (
        <div key={producto._id} className="card my-3">
          <div className="card-body">
            <h2 className="card-title">{producto.nombre}</h2>
            <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded mb-3" />
            <p className="card-text">{producto.descripcion}</p>
            <p className="card-text">Precio: ${producto.precio}</p>
            <p className="card-text">Stock: {producto.stock}</p>
          </div>
        </div>
      ))}
    </main>
  );
}

export default PaginaPrincipal;
