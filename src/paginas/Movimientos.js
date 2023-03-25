import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Kardex.css"
import { Table } from 'react-bootstrap';

const Kardex = () => {
  const [inventario, setInventario] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://kardex.seuz716.repl.co/api/productos/obtenerproductos',
      );

      setInventario(result.data.data[0].productos[0].inventario);
    };

    fetchData();
  }, [updateTable]);

  const actualizarInventario = async (idProducto, idMovimiento, cantidad) => {
    const result = await axios.put(
      `https://kardex.seuz716.repl.co/api/productos/${idProducto}/${idMovimiento}`,
      {
        cantidad,
      },
    );

    if (result.status === 200) {
      setUpdateTable(!updateTable);
    }
  };

  return (
    <div className="table-responsive">
      <Table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((movimiento, index) => (
            <tr key={movimiento.fecha}>
              <td>{movimiento.fecha}</td>
              <td>{movimiento.tipo}</td>
              <td>{movimiento.cantidad.$numberInt}</td>
              <td>
                <input
                  type="number"
                  defaultValue={movimiento.cantidad.$numberInt}
                  onChange={(e) =>
                    actualizarInventario(
                      index,
                      movimiento._id.$oid,
                      e.target.value,
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Kardex;
