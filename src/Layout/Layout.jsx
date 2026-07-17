import Navbar from "./Navbar";
import { Outlet } from "react-router";

export default function Layout({ user, setToken, setUser }) {
  return (
    <>
      <header>
        <h1>
          <img id="logo-image" src="books.png" />
          Book Buddy
        </h1>
        <Navbar user={user} setToken={setToken} setUser={setUser} />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
