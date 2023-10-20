import Bookcontainer from "./components/Bookcontainer";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [queryInput, setQueryInput] = useState({
    query: null,
    update: false,
  });

  const handleSearchClick = async (e) => {
    e.preventDefault();
    setQueryInput({
      query: e.target.searchInput.value,
      update: !queryInput.update,
    });
  };

  const sportQuery = {
    query: "sport",
    heading: "Sports",
  };
  const artQuery = {
    query: "art",
    heading: "Arts",
  };

  return (
    <>
      <section className="hero">
        <h1>Bookhunt.io</h1>
        <h3>
          Discover your next <span>favorite</span> book
        </h3>

        <img src="result.png" id="figure" alt="person reading book" />
        <form
          action="#"
          onSubmit={(e) => {
            handleSearchClick(e);
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
  );
}

export default App;
