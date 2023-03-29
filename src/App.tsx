import React from 'react';
import Faturas from './Faturas';
import Home from './Home';

const App = () => {
  const [page, setPage] = React.useState<string>('home');

  const isHome = page === 'home';
  const isFaturas = page === 'faturas';

  return (
    <>
      {isHome && (
        <Home setPage={setPage} />
      )}
      {isFaturas && (
        <Faturas setPage={setPage} />
      )}
    </>
  );
}

export default App;
