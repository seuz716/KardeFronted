import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Kardex.css"
import { Table } from 'react-bootstrap';

const Kardex = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://kardex.seuz716.repl.co/api/productos/obtenerproductos',
      );

      setProductos(result.data.data[0].productos);
    };

    fetchData();
  }, []);

  return (
    <div className="table-responsive">
  <Table className="table table-striped table-bordered table-hover">
    <thead className="thead-dark">
      <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Imagen</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Inventario</th>
      </tr>
    </thead>
    <tbody>
      {productos.map((producto) => (
        <tr key={producto._id}>
          <td>{producto.nombre}</td>
          <td>{producto.descripcion}</td>
          <td><img src={producto.imagen} alt={producto.nombre} /></td>
          <td>{producto.precio}</td>
          <td>{producto.stock}</td>
          <td>
            <ul>
              {producto.inventario.map((movimiento) => (
                <li key={`${producto._id}-${movimiento.fecha}`}>
                  {movimiento.fecha}: {movimiento.tipo} {movimiento.cantidad}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>

  );
};

export default Kardex;
