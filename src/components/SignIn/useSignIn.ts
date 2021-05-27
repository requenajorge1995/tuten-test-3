import { useState } from 'react';
import useAsyncProcess from '../../shared-hooks/useAsyncProcess';
import { User } from './../../types/User';

export default function useSignIn(setUser: (user: User) => void) {
  const { loading, error, start, end } = useAsyncProcess();
  const [credentials, setCredentials] = useState({
    email: 'testapis@tuten.cl',
    password: '1234',
  });

  return { credentials, handleInputChange, handleSubmit, loading, error };

  async function signIn() {
    start();
    try {
      const res = await fetch(
        'https://dev.tuten.cl/TutenREST/rest/user/' + credentials.email,
        {
          method: 'PUT',
          headers: {
            password: credentials.password,
            app: 'APP_BCK',
            Accept: 'application/json',
          },
        }
      );
      if (!res.ok) throw new Error(await res.text());
      const { firstName, lastName, email, sessionTokenBck } = await res.json();
      setUser({ firstName, lastName, email, token: sessionTokenBck });
    } catch (error) {
      end(error);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCredentials((credentials) => ({ ...credentials, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn();
  }
}
