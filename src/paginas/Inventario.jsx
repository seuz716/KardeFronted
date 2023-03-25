import React from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class Inventario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventario: [
        { tipo: '', cantidad: '', fecha: '' },
      ],
      mensaje: '',
      datos: {},
    };
  }

  handleInventarioChange = (event, index) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const inventario = [...this.state.inventario];
    inventario[index][name] = value;
    this.setState({
      inventario,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const inventario = this.state.inventario.map(item => ({
      tipo: item.tipo,
      cantidad: item.cantidad,
      fecha: item.fecha,
    }));

    const datos = {
      inventario,
    };

    axios.post('https://kardex.seuz716.repl.co/api/productos/crearProducto', datos)
      .then(response => {
        this.setState({
          mensaje: response.data.mensaje,
          datos: response.data.datos,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="inventario">Inventario:</Label>
          {this.state.inventario.map((inv, index) => (
            <div key={index}>
              <Input type="text" name="tipo" id="tipo" placeholder="Tipo" value={inv.tipo} onChange={(e) => this.handleInventarioChange(e, index)} />
              <Input type="number" name="cantidad" id="cantidad" placeholder="Cantidad" value={inv.cantidad} onChange={(e) => this.handleInventarioChange(e, index)} />
              <Input type="date" name="fecha" id="fecha" placeholder="Fecha" value={inv.fecha} onChange={(e) => this.handleInventarioChange(e, index)} />
            </div>
          ))}
          <Button color="secondary" onClick={() => this.setState({ inventario: [...this.state.inventario, { tipo: '', cantidad: '', fecha: '' }] })}>Agregar item</Button>
        </FormGroup>
        <Button type="submit" color="primary">Crear Producto</Button>
        <p>{this.state.mensaje}</p>
      </Form>
    );
  }
}

export default Inventario;
