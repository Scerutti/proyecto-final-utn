import React from 'react'
import { toast } from 'react-toastify';
import "./detalle.css"
import { getCorrectCondition, getFormatPrice } from '../../shared/functions';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


interface DetalleProductoProps {
  id: string;
  title: string;
  price: number;
  condition: string;
  image: string
}

const DetalleProducto: React.FC<DetalleProductoProps> = (props: DetalleProductoProps) => {
  const navigate = useNavigate();

  const handleBuyButton = () => {
    toast.success("Producto agregado al carrito", {
      position: "bottom-center"
    })
  }

  return (
    <Grid item>
      <Card onClick={() => navigate(`/product/${props.id}`)} className='card-focus'>
        <CardMedia
          component={"img"}
          alt={props.title}
          image={props.image}
        />
        <CardContent>
          <Typography variant="body1" gutterBottom> {props.title} </Typography>
          <Typography variant="caption" gutterBottom> {getCorrectCondition(props.condition)} </Typography>
          <Typography variant='body2'>Precio: {getFormatPrice(props.price)}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleBuyButton}> Agregar al carrito</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default DetalleProducto;