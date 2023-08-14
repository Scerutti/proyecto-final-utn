import React from 'react';
import { Results } from '../../shared/interface';
import { URL_API } from '../../shared/api';
import DetalleProducto from '../detalle-producto/DetalleProducto';
import "./home.css";
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';

const Home: React.FC<{}> = () => {
  const [productos, setProductos] = React.useState<Results[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 6;

  React.useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch(URL_API);
        const data = await response.json();
        setProductos(data.results);
      } catch (error) {
        toast.error(`Error al obtener los productos: ${error}`);
      }
    };
    
    obtenerProductos();
  }, []);
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-container">
      <h2>Home</h2>
        <div className="product-grid">
          {currentProducts.map((producto) => (
            <Grid container key={producto.id}>
              <DetalleProducto id={producto.id} price={producto.price} title={producto.title} condition={producto.condition} image={producto.thumbnail} />
            </Grid>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(productos.length / productsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
              {index + 1}
            </button>
          ))}
        </div>
    </div>
  );
};

export default Home;
