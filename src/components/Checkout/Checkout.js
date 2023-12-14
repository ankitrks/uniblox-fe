import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Checkout = () => {
  const location = useLocation();
  const { addedProducts, orderId } = location.state;
  const [discountCode, setDiscountCode] = useState('');
  const [generatedCoupon, setGeneratedCoupon] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  console.log(addedProducts, orderId)

  const handleGenerateCoupon = async () => {
    try {
      const response = await api.post('/admin/generate_discount_code/');
      setGeneratedCoupon(response.data.discount_code);
      setError('');
    } catch (error) {
      setGeneratedCoupon('');
      setError('No discount code available for the current order');
    }
  };

  const handleCheckout = async () => {
    try {
       await api.post(`/orders/${orderId}/checkout/`, {
        discount_code: discountCode,
      });

      navigate(`/purchase-details`);

    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Checkout</Typography>
      <List>
        {addedProducts.map((item) => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar alt={item.product.name} src={`https://picsum.photos/id/${item.id + 50}/1000/1000`} /> {/* Add the correct image prop */}
            </ListItemAvatar>
            <ListItemText primary={item.product.name} secondary={`Quantity: 1`} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Discount Code"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleGenerateCoupon}>
        Generate Coupon
      </Button>
      {generatedCoupon && <Typography variant="body2">Generated Coupon: {generatedCoupon}</Typography>}
      {error && <Typography variant="body2" color="error">{error}</Typography>}
      <Box marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;