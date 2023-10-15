import axios from 'axios'
import { useEffect, useState } from 'react'
import Books from './components/Books'
import Filter from './components/Filter'

function App() {
  const [books, setBooks] = useState(null)
  const [sportBooks, setSportBooks] = useState(null)
  const [page, setPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const booksFromLocalStorage = window.localStorage.getItem('books')
    const searchFromLocalStorage =
      window.localStorage.getItem('search')
    const pageFromLocalStorage = window.localStorage.getItem('page')
    if (booksFromLocalStorage) {
      const storedBook = JSON.parse(booksFromLocalStorage)
      setBooks(storedBook)
    }
    if (searchFromLocalStorage) {
      const storedSearch = JSON.parse(searchFromLocalStorage)
      setSearchInput(storedSearch)
    }
    if (pageFromLocalStorage) {
      const storedPage = JSON.parse(pageFromLocalStorage)
      setPage(storedPage)
    }

    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=sports`)
      .then((res) => {
        setSportBooks(res.data.items.slice(0, 6))
      })
  }, [])

  useEffect(() => {
    if (!searchInput) return
    handleSearch(null)
  }, [page])

  const handleSearch = async (e) => {
    e ? e.preventDefault() : null
    console.log(searchInput)

    try {
      if (!searchInput) {
        setBooks(null)
        setPage(0)
        window.localStorage.setItem('books', JSON.stringify(null))
        window.localStorage.setItem('page', JSON.stringify(0))
        return
      }
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&startIndex=${
          page * 10
        }`
      )

      setBooks(res.data.items.slice(0, 10))
      window.localStorage.setItem(
        'books',
        JSON.stringify(res.data.items.slice(0, 10))
      )

      window.localStorage.setItem('page', JSON.stringify(page))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="hero">
        <svg
          id="blob"
          viewBox="0 0 675 900"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <g transform="translate(675, 0)">
            <path
              d="M0 365.6C-37.8 337.2 -75.6 308.8 -122.5 295.6C-169.4 282.5 -225.4 284.5 -258.5 258.5C-291.7 232.6 -301.9 178.6 -316 130.9C-330 83.1 -347.8 41.6 -365.6 0L0 0Z"
              fill="#FBAE3C"
            >
              <animate
                attributeName="d"
                dur="10000ms"
                repeatCount="indefinite"
                values="M0 365.6C-46.5 359.9 -93 354.1 -139.9 337.8C-186.8 321.4 -234.1 294.5 -254.6 254.6C-275 214.6 -268.7 161.7 -282.7 117.1C-296.7 72.5 -331.2 36.3 -365.6 0L0 0Z;
                  M0 365.6C-48.7 353.5 -97.4 341.3 -130.1 314.1C-162.9 286.9 -179.7 244.7 -216.4 216.4C-253.1 188.1 -309.6 173.7 -337.8 139.9C-366 106.2 -365.8 53.1 -365.6 0L0 0Z;
                  M0 365.6C-48.1 356.1 -96.2 346.5 -134.3 324.3C-172.4 302 -200.5 267 -236.2 236.2C-271.8 205.3 -315 178.6 -337.8 139.9C-360.6 101.2 -363.1 50.6 -365.6 0L0 0Z;
                  M0 365.6C-46.5 359.9 -93 354.1 -139.9 337.8C-186.8 321.4 -234.1 294.5 -254.6 254.6C-275 214.6 -268.7 161.7 -282.7 117.1C-296.7 72.5 -331.2 36.3 -365.6 0L0 0Z
                  "
              ></animate>
            </path>
          </g>
        </svg>
        <h1>Bookhunt.io</h1>
        <h2>Discover your next favorite book</h2>
        <form
          onSubmit={(e) => {
            handleSearch(e, page)
          }}
          action="#"
        >
          <input
            type="text"
            value={searchInput}
            name="search"
            placeholder="Title, ISBN, Author, ..."
            onChange={(e) => {
              setSearchInput(e.target.value)
              window.localStorage.setItem(
                'search',
                JSON.stringify(e.target.value)
              )
            }}
          />
          <button>
            <svg
              id="searchBtn"
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </form>
      </div>

      <section>
        <Books
          handleSearch={handleSearch}
          page={page}
          setPage={setPage}
          books={books}
        />
        <h2>Sports Books</h2>
        <Books
          handleSearch={handleSearch}
          page={page}
          setPage={setPage}
          books={sportBooks}
        />
        <svg
          id="blob2"
          viewBox="0 0 675 900"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <g transform="translate(0, 900)">
            <path fill="#FBAE3C">
              <animate
                attributeName="d"
                dur="10000ms"
                repeatCount="indefinite"
                values="M0 -365.6C46.3 -359.9 92.6 -354.1 139.9 -337.8C187.2 -321.5 235.5 -294.7 253.9 -253.9C272.2 -213.1 260.7 -158.3 274.4 -113.7C288 -69 326.8 -34.5 365.6 0L0 0Z; M0 -365.6C49.7 -362.1 99.4 -358.6 139.9 -337.8C180.4 -317 211.7 -279 244 -244C276.2 -208.9 309.4 -176.8 329.8 -136.6C350.3 -96.5 357.9 -48.2 365.6 0L0 0Z; M0 -365.6C42.5 -338.3 85.1 -311 118.2 -285.5C151.4 -259.9 175.3 -236.1 215 -215C254.6 -193.8 310.1 -175.3 337.8 -139.9C365.5 -104.5 365.6 -52.3 365.6 0L0 0Z; M0 -365.6C41.1 -346 82.1 -326.3 129.3 -312.3C176.6 -298.2 229.9 -289.8 258.5 -258.5C287.2 -227.3 291.1 -173.2 304.9 -126.3C318.6 -79.4 342.1 -39.7 365.6 0L0 0Z; M0 -365.6C46.3 -359.9 92.6 -354.1 139.9 -337.8C187.2 -321.5 235.5 -294.7 253.9 -253.9C272.2 -213.1 260.7 -158.3 274.4 -113.7C288 -69 326.8 -34.5 365.6 0L0 0Z"
              ></animate>
            </path>
          </g>
        </svg>
      </section>
    </>
  )
}

export default App
