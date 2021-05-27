import { useState } from 'react';
import { User } from './types/User';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';
import { CssBaseline } from '@material-ui/core';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState<User>();

  if (!user) return <SignIn setUser={setUser} />;

  return (
    <>
      <CssBaseline />
      <Header user={user} />
      <Dashboard user={user} />
    </>
  );
}

export default App;
