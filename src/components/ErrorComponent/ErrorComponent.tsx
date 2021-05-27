import { makeStyles, Box, Typography } from '@material-ui/core';
import { MdErrorOutline } from 'react-icons/md';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    textAlign: 'center',
    margin: '30vh auto 0',
    transform: 'translateY(-50%)',
    '& svg': {
      fontSize: '6rem',
      color: theme.palette.error.main,
    },
  },
}));

function ErrorComponent({ children }: Props) {
  const { root } = useStyles();

  const { message } = children;

  return (
    <Box className={root}>
      <MdErrorOutline />
      <Typography variant='h5' color='error'>
        Error
      </Typography>
      {message && <Typography color='textSecondary'>{message}</Typography>}
    </Box>
  );
}

type Props = {
  children: Error;
};

export default ErrorComponent;
