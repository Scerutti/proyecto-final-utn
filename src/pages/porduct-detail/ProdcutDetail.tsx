import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Results } from '../../shared/interface';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { getCorrectCondition, getFormatPrice } from '../../shared/functions';
import { GET_ITEM_DETAIL } from '../../shared/api';
import { toast } from 'react-toastify';
import { ArrowBack } from '@mui/icons-material';

const ProdcutDetail = () => {
  const params = useParams();
  const [prod, setProd] = React.useState<Results>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (params.id) {
      fetch(`${GET_ITEM_DETAIL}/${params.id}`)
        .then(res => res.json())
        .then(result => setProd(result))
        .catch(err => toast.error(`Error al obtener el producto: ${err}`));
    }
  }, [params]);

  return (
    <>
      <IconButton onClick={() => navigate(-1)} style={{ alignSelf: 'flex-start', marginLeft: '10px' }}>
        <ArrowBack />
      </IconButton>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {prod && (
          <Card style={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              alt={prod.title}
              image={prod.thumbnail}
            />
            <CardContent>
              <Typography variant="body1" gutterBottom>{prod.title}</Typography>
              <Typography variant="caption" gutterBottom>{getCorrectCondition(prod.condition)}</Typography>
              <Typography variant="body2">Precio: {getFormatPrice(prod.price)}</Typography>
              <Typography variant="body2">{prod.warranty}</Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProdcutDetail;
