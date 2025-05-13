import React, { useState } from 'react';
import { login } from '../utils/api';  // Import login function from the new authApi.js
import {
  Button,
  TextField,
  Link,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken } = await login(email, password);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      swal({
        text: err.response?.data?.message || 'Échec de la connexion',
        icon: 'error',
      });
    }

  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 8,
        maxWidth: 400,
        mx: 'auto',
        p: 3,
      }}
    >
      <h2 style={{ marginBottom: 24 }}>Connexion</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%' }}
      ></Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          size="small"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          size="small"
          required
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Se connecter
        </Button>
      </form>
      <Link href="/register" variant="body2" sx={{ mt: 2 }}>
        Vous n'avez pas de compte? Inscrivez-vous
      </Link>
    </Box>
  );
};

export default Login;
