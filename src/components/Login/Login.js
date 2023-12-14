import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import api from '../../services/api';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleLogin = async () => {
    try {
      const response = await api.post('/token/', {
        username,
        password,
      });
      const token = response.data.access;
      localStorage.setItem('token', token);
      onLogin();
      navigate('/products');  // Use navigate instead of history.push
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography variant="body2" color="error">{error}</Typography>}
      <Box marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
