import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CssBaseline,
} from '@material-ui/core';
import { User } from '../../types/User';
import LoaderBackdrop from '../BackdropLoader/BackdropLoader';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import useSignIn from './useSignIn';
import logo from '../../assets/tuten-logo.png';

function SignIn({ setUser }: Props) {
  const { credentials, handleInputChange, handleSubmit, loading, error } =
    useSignIn(setUser);

  if (error) return <ErrorComponent>{error}</ErrorComponent>;

  return (
    <>
      <CssBaseline />
      <LoaderBackdrop open={loading} />
      <Container maxWidth='xs'>
        <Box mt={10}>
          <Box mb={4} textAlign='center'>
            <Box>
              <img src={logo} alt='tuten-logo' />
            </Box>
            <Typography variant='caption'>
              Techical Test - Jorge Requena
            </Typography>
          </Box>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={credentials.email}
              onChange={handleInputChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={credentials.password}
              onChange={handleInputChange}
            />
            <Box mt={2}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

type Props = {
  setUser(user: User): void;
};

export default SignIn;
