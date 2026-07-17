import { useParams } from "react-router";
const Book = ({ books }) => {
  const { id } = useParams();
  console.log(books);
  const singleBook = books.find((book) => {
    return book.id === id * 1;
  });
  if (!singleBook) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="singleBookDetails">
      <h2 className="singleBookTitle">{singleBook.title}</h2>
      <h2 className="singleBookAuthor">{singleBook.author}</h2>
      <p>{singleBook.description}</p>
      <img src={singleBook.coverimage} />
      <p>
        {singleBook.available
          ? "Book is Available return to books page to reserve!"
          : "Book is Unavailable."}
      </p>
    </div>
  );
};
export default Book;
