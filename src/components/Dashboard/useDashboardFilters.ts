import { ChangeEvent } from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Booking } from './../../types/Booking';

type PriceFilter = {
  min?: number;
  max?: number;
};

function useDashboardFilters(bookings: Booking[]) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idFilter, setIdFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>({});

  const filteredBookings = useMemo(
    () =>
      bookings.filter(({ id, price }) => {
        const { min, max } = priceFilter;
        return (
          id.toString().startsWith(idFilter) &&
          (!min || price >= min) &&
          (!max || price <= max)
        );
      }),
    [bookings, idFilter, priceFilter]
  );

  const from = page * rowsPerPage,
    to = from + rowsPerPage;
  const bookingsSlice = filteredBookings.slice(from, to);

  useEffect(() => {
    setPage(0);
  }, [filteredBookings]);

  return {
    options: { page, setPage, rowsPerPage, setRowsPerPage },
    bookingsTotal: filteredBookings.length,
    bookingsSlice,
    idFilter,
    handleIdFilterChange,
    priceFilter,
    handlePriceFilterChange,
  };

  function handleIdFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setIdFilter(event.target.value);
  }

  function handlePriceFilterChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value: valueString } = event.target;
    const value = parseInt(valueString);
    setPriceFilter((prev) => ({
      ...prev,
      [name]: value <= 0 || isNaN(value) ? undefined : value,
    }));
  }
}

export default useDashboardFilters;
