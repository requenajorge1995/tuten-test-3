import {
  LinearProgress,
  TextField,
  Container,
  Box,
  Card,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { User } from '../../types/User';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import useDashboardData from './useDashboardData';
import useDashboardFilters from './useDashboardFilters';

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'CLP',
});

function Dashboard({ user }: Props) {
  const { bookings, loading, error } = useDashboardData(user);
  const {
    bookingsSlice,
    bookingsTotal,
    idFilter,
    handleIdFilterChange,
    priceFilter,
    handlePriceFilterChange,
    options,
  } = useDashboardFilters(bookings);

  if (error) return <ErrorComponent>{error}</ErrorComponent>;
  if (loading) return <LinearProgress />;

  return (
    <Box mt={3}>
      <Container>
        <Card>
          <CardHeader
            title={
              <Typography color='primary' variant='h5'>
                <b>Bookings List</b>
              </Typography>
            }
          />
          <Box marginX={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='standard'
                  size='small'
                  value={idFilter}
                  onChange={handleIdFilterChange}
                  label='Filter by ID'
                  style={{ maxWidth: '150px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box ml='auto' width='fit-content' mb={2}>
                  <TextField
                    variant='outlined'
                    value={priceFilter.min || ''}
                    name='min'
                    type='number'
                    onChange={handlePriceFilterChange}
                    label='Min'
                    size='small'
                    style={{ maxWidth: '110px' }}
                  />
                  <span> </span>
                  <TextField
                    variant='outlined'
                    value={priceFilter.max || ''}
                    name='max'
                    type='number'
                    onChange={handlePriceFilterChange}
                    label='Max'
                    size='small'
                    style={{ maxWidth: '110px' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell color='secondary'>
                    <b>BookingId</b>
                  </TableCell>
                  <TableCell color='secondary' align='center'>
                    <b>Cliente</b>
                  </TableCell>
                  <TableCell color='secondary' align='center'>
                    <b>Fecha de Creación</b>
                  </TableCell>
                  <TableCell color='secondary' align='center'>
                    <b>Dirección</b>
                  </TableCell>
                  <TableCell color='secondary' align='right'>
                    <b>Precio</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingsSlice.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell align='center'>{booking.fullName}</TableCell>
                    <TableCell align='center'>
                      {booking.date.toLocaleDateString()}
                    </TableCell>
                    <TableCell align='center'>{booking.address}</TableCell>
                    <TableCell align='right'>
                      {currencyFormatter.format(booking.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage='Bookings per page'
                    rowsPerPage={options.rowsPerPage}
                    count={bookingsTotal}
                    page={options.page}
                    onChangePage={(_, page) => options.setPage(page)}
                    onChangeRowsPerPage={(event) =>
                      options.setRowsPerPage(parseInt(event.target.value))
                    }
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Box>
  );
}

type Props = {
  user: User;
};

export default Dashboard;
