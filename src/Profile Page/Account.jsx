import axios from "axios";

const Account = ({ userBooks, user, setUserBooks, books }) => {
  const removeBook = async (bookId) => {
    try {
      await axios.delete(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        },
      );
      setUserBooks(
        userBooks.filter((book) => {
          return book.id !== bookId;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="account">
      <h4>{user.firstname}'s Profile</h4>
      <p>
        User's Name: {user.firstname} {user.lastname}
      </p>

      <p> User Email: {user.email}</p>
      <hr />
      <h5>Rented Books: </h5>
      {userBooks.length > 0 ? (
        <div>
          {userBooks.map((book) => {
            const foundBook = books.find((b) => {
              return b.id === book.bookid;
            });
            return (
              <div key={book.id}>
                <p>{foundBook.title}</p>
                <div className="buttonContainer">
                  <button
                    className="returnButton"
                    onClick={() => {
                      removeBook(book.id);
                    }}
                  >
                    Return Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No books rented? Rent some !</p>
      )}
    </div>
  );
};
export default Account;
