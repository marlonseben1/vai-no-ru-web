import { Link, Outlet } from 'react-router';

export function PrivateLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Cardápio</Link>
        {' | '}
        <Link to="/reservas">Reservas</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
