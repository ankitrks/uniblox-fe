import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import ProductList from '../ProductList/ProductList';

const AddToCart = ({ onCheckout }) => {
  const [cart, setCart] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    try {
    //   if (!orderId) {
    //     const newOrderResponse = await api.post('/orders/', {});
    //     setOrderId(newOrderResponse.data.id);
    //   }

      const response = await api.post(`/orders/${orderId}/add_to_cart/`, {
        product_id: product.id,
        quantity: 1,
      });
      if (!orderId) {
        setOrderId(response.data.id);
      }
      setAddedProducts([...addedProducts, { id: response.data.id, product }]);

      setCart([...cart, response.data]);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleCheckout = () => {
    navigate(`/checkout`, { state: { addedProducts, orderId } });
  };

  return (
    <Box>
      <Typography variant="h6">Add to Cart</Typography>
      <ProductList onAddToCart={handleAddToCart} />
      <Box marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default AddToCart;
