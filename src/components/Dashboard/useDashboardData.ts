import { useState, useEffect } from 'react';
import { Booking } from '../../types/Booking';
import { User } from '../../types/User';
import useAsyncProcess from '../../shared-hooks/useAsyncProcess';

function useDashboardData(user: User) {
  const { start, end, loading, error } = useAsyncProcess(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    (async function getBookings() {
      start();
      try {
        const res = await fetch(
          'https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true',
          {
            headers: {
              adminemail: user.email,
              token: user.token,
              app: 'APP_BCK',
              Accept: 'application/json',
            },
          }
        );
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setBookings(parseResponse(data));
        end();
      } catch (error) {
        end(error);
      }
    })();
  }, [end, start, user]);

  return { bookings, loading, error };
}

function parseResponse(response: BookingResponse[]) {
  const bookings: Booking[] = [];
  response.forEach(parseBookingRecursively);
  return bookings;

  function parseBookingRecursively(input: BookingResponse) {
    const booking = {
      id: input.bookingId,
      date: new Date(input.bookingTime),
      fullName: `${input.tutenUserClient.firstName} ${input.tutenUserClient.lastName}`,
      address: input.locationId.streetAddress,
      price: input.bookingPrice,
    };

    bookings.push(booking);
    if (input.parentBooking) parseBookingRecursively(input.parentBooking);
  }
}

type BookingResponse = {
  bookingId: number;
  bookingTime: number;
  bookingPrice: number;
  parentBooking?: BookingResponse;
  tutenUserClient: {
    firstName: string;
    lastName: string;
  };
  locationId: {
    streetAddress: string;
  };
};

export default useDashboardData;
