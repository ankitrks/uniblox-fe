import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Typography variant="h6">Product List</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {products.map((product) => (
        <Card key={product.id} variant="outlined" style={{ marginBottom: '20px', width: '30%' }}>
          <CardMedia
            component="img"
            alt={product.name}
            height="140"
            image={`https://picsum.photos/id/${product.id + 50}/1000/1000`}
            />
          <CardContent>
            <Typography variant="body1">{product.name}</Typography>
            <Typography variant="body2">Price: ${parseFloat(product.price).toFixed(2)}</Typography>
            <Box marginTop={2}>
              <Button variant="contained" color="primary" onClick={() => onAddToCart(product)}>
                Add to Cart
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
};

export default ProductList;