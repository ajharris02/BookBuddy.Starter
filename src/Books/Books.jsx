import axios from "axios";
import { NavLink } from "react-router";

const Books = ({ books, user, userBooks, setUserBooks }) => {
  const rentBooks = async (book) => {
    try {
      const { data } = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          bookId: book.id,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        },
      );
      console.log(data);
      setUserBooks([...userBooks, data]);
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
  };
  const checkBook = (bookId) => {
    return userBooks.find((reservation) => {
      return reservation.bookid === bookId;
    });
  };

  return (
    <div>
      <div className="bookContainer">
        {books.map((book) => {
          return (
            <div key={book.id} className="bookItem">
              <h2>
                <NavLink to={`/books/${book.id}`}>{book.title} </NavLink>
              </h2>
              <div className="bookDetails">
                <span>
                  <img src={book.coverimage} className="bookImage" />
                </span>
                <div className="bookInfo">
                  <p id="author">{book.author}</p>
                  <br />
                  {book.description}

                  {user.id ? (
                    <div>
                      {checkBook(book.id) ? (
                        <button disabled={true}>Rented</button>
                      ) : book.available ? (
                        <button
                          onClick={() => {
                            rentBooks(book);
                          }}
                        >
                          Reserve
                        </button>
                      ) : (
                        <button disabled={true}>Unavailable</button>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Books;
