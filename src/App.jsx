import Bookcontainer from './components/Bookcontainer'
import { useState } from 'react'
import Footer from './components/Footer'

function App() {
  const [queryInput, setQueryInput] = useState({
    query: null,
    update: false,
  })

  const handleSearchClick = async (e) => {
    e.preventDefault()
    setQueryInput({
      query: e.target.searchInput.value,
      update: !queryInput.update,
    })
    const booksContainer = document.querySelector('.booksContainer')
    booksContainer.scrollIntoView({ behavior: 'smooth' })
  }

  const sportQuery = {
    query: 'sport',
    heading: 'Sports',
  }
  const artQuery = {
    query: 'art',
    heading: 'Arts',
  }

  return (
    <>
      <section className="hero">
        <div className="video-container">
          <video
            className="back-video"
            autoPlay
            loop
            muted
            playsInline
            src="video.mp4"
          ></video>
        </div>

        <h1>
          <span>Bookhunt.io</span>
        </h1>

        <h3>Discover your next favorite book</h3>

        <form
          action="#"
          onSubmit={(e) => {
            handleSearchClick(e)
          }}
        >
          <input
            type="text"
            name="searchInput"
            placeholder="Title, author, ISBN, ..."
          />
          <button>Search</button>
        </form>
      </section>

      <Bookcontainer queryInput={queryInput} />
      <Bookcontainer queryInput={sportQuery} />
      <Bookcontainer queryInput={artQuery} />

      <div id="overlay"></div>

      <Footer />
    </>
  )
}

export default App
