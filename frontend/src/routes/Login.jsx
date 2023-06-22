import { Alert, Box, Button, Container, Link, Snackbar, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import { React, useContext, useState } from 'react'
import styled from 'styled-components'
import Typewritter from '../Components/Typewritter';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { useTheme } from '@material-ui/core/styles';

const StyledBox = styled(Box)`
  background-color: black;
  color: white;
  padding: 10px;
  min-width: 10px;
  max-width: 365px;
  height: 40px;
`;

const StyledInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
})

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [snackbar, setSnackBar] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.status === 200) {
      navigate('/');
    } else {
      setError(result.data.error);
      setSnackBar(true);
    }
  };

  return (
    <Container>
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        open={snackbar}
        onClose={() => { setSnackBar(false) }}
      >
        <Alert severity="error" sx={{ width: '100%' }} variant='filled'>
          {error}
        </Alert>
      </Snackbar>

      <Stack pt={10} alignItems="center">
        <StyledBox>
          <Typography variant={isSmallScreen ? 'h5' : 'h4'} component="h2">
            <Typewritter text="Welcome to GameStop!" />
          </Typography>
        </StyledBox>
        <Typography variant="h4" component="h2" pt={5}>
          Login
        </Typography>
        <Stack sx={{ width: '300px' }} spacing={3} pt={5} alignItems="center">
          <StyledInput
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            sx={{ height: '50px' }}
          >
            Login
          </Button>
          <br />

          <Link href="/register">
            {'Don\'t have an account? Register here'}
          </Link>

        </Stack>
      </Stack>
    </Container>
  )
}

export default Login
