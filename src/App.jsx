import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router";
import Books from "./Books/Books";
import Book from "./Books/Book";
import Register from "./Profile Page/Register";
import Login from "./Profile Page/Login";
import Error404 from "./Layout/Error404";
import Account from "./Profile Page/Account";

function App() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [error, setError] = useState([]);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const { data } = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books",
        );
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fecthData();
  }, []);
  const authenticate = async () => {
    try {
      if (!window.localStorage.getItem("token")) {
        throw Error("No token found");
      }
      const { data } = await axios.get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        },
      );

      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const checkToken = () => {
      const loggedInToken = window.localStorage.getItem("token");
      if (loggedInToken) {
        setToken(loggedInToken);
        authenticate();
      }
    };
    checkToken();
  }, [user.id]);

  useEffect(() => {
    if (!user.id) {
      console.log("no user found");
      return;
    }
    const fetchReservations = async () => {
      console.log("fetch reservations effect ran");
      const { data } = await axios.get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        },
      );
      console.log(data);
      setUserBooks(data);
    };
    const loggedInToken = window.localStorage.getItem("token");
    if (loggedInToken) {
      fetchReservations();
    }
  }, [user.id]);

  return (
    <div className="app">
      <Routes>
        <Route
          element={<Layout user={user} setToken={setToken} setUser={setUser} />}
        >
          <Route
            index
            element={
              <Books
                books={books}
                user={user}
                userBooks={userBooks}
                setUserBooks={setUserBooks}
              />
            }
          />
          <Route
            path="/books/:id"
            element={<Book books={books} user={user} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                error={error}
                setToken={setToken}
                authenticate={authenticate}
                setError={setError}
              />
            }
          />
          <Route
            path="/account"
            element={
              <Account
                userBooks={userBooks}
                user={user}
                setUserBooks={setUserBooks}
                books={books}
              />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
