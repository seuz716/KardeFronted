import React, { useState } from 'react';
import DetalleProducto from './DetalleProducto';

function PaginaPrincipal() {
  const [productos, setProductos] = useState([]);
  const [mostrarDetalleProducto, setMostrarDetalleProducto] = useState(null);

  // ...

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
            <button onClick={() => setMostrarDetalleProducto(producto._id)}>Ver detalle</button>
          </div>
        </div>
      ))}
     {mostrarDetalleProducto && <DetalleProducto idProducto={mostrarDetalleProducto} />}

    </main>
  );
}

export default PaginaPrincipal;