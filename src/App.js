import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SearchPage from "./Pages/SearchPage";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState([]);


  useEffect(() => {
    BooksAPI.getAll().then((res) => {
      setAllBooks(res);
      setSuccess(true);
      // console.log(res);
    });
  }, []);

  function changeSelf(book, targetshelf) {
    // console.log("changed");
    if (targetshelf === "none") {
      setAllBooks(allBooks.filter((b) => book.id !== b.id));
    } else {
      const newBooks = allBooks.map((b) => {
        if (b.id === book.id) {
          b.shelf = targetshelf;
          return b;
        } else {
          return b;
        }
      });
      setAllBooks(newBooks);
      BooksAPI.update(book, targetshelf);
    }
  }

  function handleInput(e) {
    const Q = e.target.value;

    if (Q !== null && Q !== "") {
      handleSearch(Q);
      console.log(Q);
    } else {
      setResult([]);
    }
  }

  function handleSearch(q) {
    BooksAPI.search(q)
      .then((data) => {
        setResult(
          data.map((rslt) => {
            allBooks.forEach((b) => {
              if (rslt.id === b.id) {
                rslt.shelf = b.shelf;
              }
            });
            return rslt;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <BrowserRouter>
      {success ? (
        <div className="app">
          <Routes>
            <Route
              path="/"
              exact
              element={<MainPage allBooks={allBooks} changeSelf={changeSelf} />}
            />
            <Route
              path="/search"
              element={
                <SearchPage
                  handleInput={handleInput}
                  result={result}
                  changeSelf={changeSelf}
                  allBooks={allBooks}
                />
              }
            />
          </Routes>
        </div>
      ) : null}
    </BrowserRouter>
  );
}

export default App;
