import React, { useState } from 'react';
import { register } from '../utils/api'; // Assuming api.js or authApi.js has the register function
import { Button, TextField, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const res = await register(userData); 

      if (res.accessToken && res.refreshToken) {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      }

      swal('Succès', 'Inscription réussie', 'success');
      navigate('/'); 
    } catch (err) {
      swal({
        text: err.response?.data?.message || "Erreur lors de l'inscription",
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
      <h2 style={{ marginBottom: 24 }}>Inscription</h2>

      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ width: '100%' }}
      >
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          type="password"
          label="Mot de passe"
          variant="outlined"
          fullWidth
          size="small"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="medium"
          sx={{
            mt: 2,
            py: 1,
            fontSize: '0.875rem',
            textTransform: 'none'
          }}
          disabled={!email || !password}
        >
          S'inscrire
        </Button>
      </Box>

      <Link
        component="button"
        variant="body2"
        onClick={() => navigate('/')}
        sx={{
          mt: 2,
          fontSize: '0.875rem',
          textAlign: 'center'
        }}
      >
        Déjà inscrit ? Se connecter
      </Link>
    </Box>
  );
};

export default Register;
