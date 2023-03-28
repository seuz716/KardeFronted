import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './Kardex.css'; // importar archivo CSS para los estilos

const Kardex = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        'https://kardex.seuz716.repl.co/api/productos/obtenerProductos'
      );
      setProductos(response.data.data);
    }

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
          {productos.map((producto) => {
            const inventario = producto.inventario.tiendas.map((movimiento) => ({
              tipo: movimiento.tipo,
              cantidad: movimiento.cantidad,
              fecha: movimiento.fecha,
            }));

            return (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td><img src={producto.imagen} alt={producto.nombre} className="producto-imagen"/></td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <ul>
                    {inventario.map((movimiento, index) => (
                      <li key={index}>
                        {movimiento.fecha}: {movimiento.tipo} {movimiento.cantidad}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Kardex;
