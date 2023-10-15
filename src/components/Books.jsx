import Filter from './Filter'

function Books({ books, setPage, page }) {
  if (!books) return

  return (
    <div className="booksContainer">
      <Filter setPage={setPage} page={page} />
      <div className="books">
        {books.map((book) => {
          if (!book) {
            return <div key={book.id}></div>
          }
          return (
            <div className="book" key={book.id}>
              {book.volumeInfo.title ? (
                <h2>{book.volumeInfo.title}</h2>
              ) : (
                <h2>No Title</h2>
              )}
              {book.volumeInfo.authors ? (
                <h3>{book.volumeInfo.authors[0]}</h3>
              ) : (
                <h3>No authors</h3>
              )}
              {book.volumeInfo.imageLinks ? (
                <img
                  src={`${book.volumeInfo.imageLinks.thumbnail}`}
                  alt={`book cover of ${book.title}`}
                />
              ) : (
                <>
                  <img
                    src={'no_img.png'}
                    alt={`book cover of ${book.title}`}
                  />
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Books
