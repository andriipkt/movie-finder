import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { RotatingLines } from 'react-loader-spinner';

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 26px;

  &.active {
    color: orange;
  }
`;

const NavBar = styled.ul`
  flex-direction: row;
  gap: 24px;
  margin-left: 2vw;
`;

const Layout = () => {
  return (
    <>
      <header>
        <nav className="navbar bg-dark mb-3">
          <div className="container-fluid">
            <NavBar className="navbar-nav">
              <li className="nav-item">
                <StyledNavLink to="/">Home Page</StyledNavLink>
              </li>
              <li className="nav-item">
                <StyledNavLink to="/movies">Movies</StyledNavLink>
              </li>
            </NavBar>
          </div>
        </nav>
      </header>
      <main>
        <div className="container">
          <Suspense
            fallback={<RotatingLines strokeColor="orange" width="36" />}
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
      <footer style={{ display: 'block', marginTop: '90vh' }}>Footer</footer>
    </>
  );
};

export default Layout;
