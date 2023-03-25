import React from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CrearProducto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nombre: '',
      descripcion: '',
      imagen: '',
      precio: '',
      stock: '',
      inventario: [],
      mensaje: '',
      datos: {},
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
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

    const datos = {
      id: this.state.id,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      imagen: this.state.imagen,
      precio: this.state.precio,
      stock: this.state.stock,
      inventario: this.state.inventario,
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
          <Label for="id">ID:</Label>
          <Input type="text" name="id" id="id" value={this.state.id} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="nombre">Nombre:</Label>
          <Input type="text" name="nombre"/>
        </FormGroup>
        <FormGroup>
          <Label for="descripcion">Descripción:</Label>
          <Input type="textarea" name="descripcion" id="descripcion" value={this.state.descripcion} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="imagen">Imagen:</Label>
          <Input type="text" name="imagen" id="imagen" value={this.state.imagen} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="precio">Precio:</Label>
          <Input type="number" name="precio" id="precio" value={this.state.precio} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="stock">Stock:</Label>
          <Input type="number" name="stock" id="stock" value={this.state.stock} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="inventario">Inventario:</Label>
          {this.state.inventario.map((inv, index) => (
            <div key={index}>
              <Input type="text" name="tienda" id="tienda" placeholder="Tienda" value={inv.tienda} onChange={(e) => this.handleInventarioChange(e, index)} />
              <Input type="number" name="cantidad" id="cantidad" placeholder="Cantidad" value={inv.cantidad} onChange={(e) => this.handleInventarioChange(e, index)} />
            </div>
          ))}
          <Button color="secondary" onClick={() => this.setState({ inventario: [...this.state.inventario, { tienda: '', cantidad: '' }] })}>Agregar tienda</Button>
        </FormGroup>
        <Button type="submit" color="primary">Crear Producto</Button>
        <p>{this.state.mensaje}</p>
      </Form>
    );
  }
}

export default CrearProducto;