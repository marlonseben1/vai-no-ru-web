import { Link, Outlet } from 'react-router';

export function PublicLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Login</Link>
        {' | '}
        <Link to="/cardapio">Cardápio</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
