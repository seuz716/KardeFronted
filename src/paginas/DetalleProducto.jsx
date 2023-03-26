function DetalleProducto(props) {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    async function obtenerProducto() {
      const response = await axios.get(`https://kardex.seuz716.repl.co/api/productos/obtenerProductos/${props.idProducto}`);
      setProducto(response.data.data);
    }
    obtenerProducto();
  }, [props.idProducto]);

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="card my-3">
      <div className="card-body">
        <h2 className="card-title">{producto.nombre}</h2>
        <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded mb-3" />
        <p className="card-text">{producto.descripcion}</p>
        <p className="card-text">Precio: ${producto.precio}</p>
        <p className="card-text">Stock: {producto.stock}</p>
        <p className="card-text">Inventario:</p>
        <ul>
          {producto.inventario.tiendas.map((registro, index) => (
            <li key={index}>{producto.inventario.tipo} ({registro.cantidad}) - {registro.fecha} ({registro.tienda})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetalleProducto;

