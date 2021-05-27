import {
  Box,
  AppBar,
  Slide,
  Toolbar,
  useScrollTrigger,
  Typography,
} from '@material-ui/core';
import { User } from '../../types/User';
import Logo from './Logo/Logo';

function Header({ user }: Props) {
  const trigger = useScrollTrigger();
  const { firstName, lastName } = user;

  return (
    <>
      <Slide appear={false} direction='down' in={!trigger}>
        <AppBar color='primary'>
          <Toolbar>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              width='100%'
            >
              <Logo />
              <Typography>
                Hola,{' '}
                <b>
                  {firstName} {lastName}
                </b>
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}

type Props = {
  user: User;
};

export default Header;
