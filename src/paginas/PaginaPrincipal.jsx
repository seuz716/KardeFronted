import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './PaginaPrincipal.css';

function PaginaPrincipal() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function obtenerProductos() {
      const response = await axios.get(
        'https://kardex.seuz716.repl.co/api/productos/obtenerProductos'
      );
      const data = response.data;
      setProductos(data.data);
    }

    obtenerProductos();
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Listado de productos</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {productos.map((producto) => (
          <Col key={producto.id}>
            <Card className="h-100 producto-card">
              <div className="ratio ratio-1x1">
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="card-img-top rounded producto-imagen"
                />
              </div>
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text>Precio: ${producto.precio}</Card.Text>
                <Card.Text>Stock: {producto.stock}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" className="w-100 boton-comprar">
                  Comprar
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PaginaPrincipal;
