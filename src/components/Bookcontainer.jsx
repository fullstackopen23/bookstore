import { useEffect, useState } from 'react'
import { getBooks } from '../utils/server'

function Bookcontainer({ queryInput }) {
  const [books, setBooks] = useState([])
  const [free, setFree] = useState(false)
  const [totalItems, setTotalItems] = useState(null)
  const [page, setPage] = useState(0)
  const [noBook, setNoBook] = useState(false)

  useEffect(() => {
    setNoBook(false)
    if (!queryInput.query) return
    getBooks(queryInput.query, page, free).then((res) => {
      console.log(res)
      if (!res.items || res.totalItems === 0) {
        setBooks([])
        setNoBook(true)
        return
      } else {
        setBooks(res.items)
        setTotalItems(res.totalItems)
      }
    })
  }, [queryInput, free, page])

  const handleNextPage = () => {
    if (totalItems < 10) return
    setPage(page + 1)
  }
  const handlePrevPage = () => {
    if (page - 1 < 0) return
    setPage(page - 1)
  }
  const handleFreeBtn = (e) => {
    e.preventDefault()
    if (e.target.innerHTML === 'Show free books only') {
      e.target.innerHTML = 'Show all books'
    } else {
      e.target.innerHTML = 'Show free books only'
    }
    setPage(0)
    if (free) {
      setFree(false)
    } else {
      setFree('free-ebooks')
    }
  }

  const openPopup = (id) => {
    const popup = document.querySelector(`[data-id=${id}]`)
    const overlay = document.getElementById('overlay')
    overlay.addEventListener('click', () => {
      popup.classList.remove('active')
      overlay.classList.remove('active')
    })
    popup.classList.add('active')
    overlay.classList.add('active')
    console.log(popup)
  }

  return (
    <div>
      {books.length > 0 ? (
        <div className="booksContainer">
          {queryInput.heading ? (
            <h2>Trending Books in {queryInput.heading}</h2>
          ) : queryInput.query ? (
            <h2 className="results">
              Results for "{queryInput.query}"
            </h2>
          ) : (
            <></>
          )}

          <div className="controls">
            <button onClick={handlePrevPage}>-</button>
            <p>{page}</p>
            <button onClick={handleNextPage}>+</button>
            <button
              onClick={(e) => {
                handleFreeBtn(e)
              }}
              id="freeBtn"
            >
              Show free books only
            </button>
          </div>
          <div className="books">
            {books.map((book) => (
              <div
                className="book"
                key={book.id}
                onClick={() => {
                  openPopup(book.id)
                }}
              >
                <h2 className="title">{book.volumeInfo.title}</h2>
                {book.volumeInfo.authors ? (
                  <p>{book.volumeInfo.authors[0]}</p>
                ) : (
                  <p>No author found</p>
                )}
                {book.volumeInfo.imageLinks ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                  ></img>
                ) : (
                  <img src="no_img.png"></img>
                )}

                <div id="popup" data-id={book.id}>
                  <h2>{book.volumeInfo.title}</h2>

                  {book.volumeInfo.imageLinks ? (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                    ></img>
                  ) : (
                    <img src="no_img.png"></img>
                  )}

                  <p>{book.volumeInfo.description}</p>
                  <button>
                    {book.saleInfo.saleability === 'NOT_FOR_SALE' ? (
                      <a href="#">Not for sale</a>
                    ) : (
                      <a href={book.saleInfo.buyLink}> BUY</a>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : noBook === true ? (
        <div className="booksContainer">
          <div className="controls">
            <button onClick={handlePrevPage}>-</button>
            <p>{page}</p>
            <button onClick={handleNextPage}>+</button>
            <button
              onClick={(e) => {
                handleFreeBtn(e)
              }}
              id="freeBtn"
            >
              {!free ? 'Show free books only' : 'Show all books'}
            </button>
          </div>
          No books found
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Bookcontainer
