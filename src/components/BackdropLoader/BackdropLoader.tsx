import { Backdrop, makeStyles } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function LoaderBackdrop({ open }: Props) {
  const { root } = useStyles();

  return (
    <Backdrop open={open} className={root}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

type Props = {
  open: boolean;
};

export default LoaderBackdrop;
