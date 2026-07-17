import { NavLink } from "react-router";

export default function Navbar({ user, setUser, setToken }) {
  const logout = () => {
    setUser({});
    setToken(null);
    window.localStorage.removeItem("token");
  };
  return (
    <nav>
      <NavLink to="/">Books</NavLink>
      {user.id ? (
        <span>
          <NavLink to="/account">Account</NavLink>
          <NavLink
            to="/"
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </NavLink>
        </span>
      ) : (
        <span>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </span>
      )}
    </nav>
  );
}
