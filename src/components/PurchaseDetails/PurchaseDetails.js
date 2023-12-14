// src/components/PurchaseDetails/PurchaseDetails.js
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const PurchaseDetails = () => {
  const [purchaseDetails, setPurchaseDetails] = useState(null);

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        const response = await api.get('/admin/purchase_details/');
        setPurchaseDetails(response.data);
      } catch (error) {
        console.error('Error fetching purchase details:', error);
      }
    };

    fetchPurchaseDetails();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Purchase Details</Typography>
      {purchaseDetails && (
        <Box>
          <Typography>Total Items Purchased: {purchaseDetails.total_items_purchased}</Typography>
          <Typography>Total Purchase Amount: ${purchaseDetails.total_purchase_amount.toFixed(2)}</Typography>
          <Typography>Discount Codes:{purchaseDetails.discount_codes.filter(Boolean).join(', ')}</Typography>
          <Typography>Total Discount Amount: ${purchaseDetails.total_discount_amount.toFixed(2)}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PurchaseDetails;
