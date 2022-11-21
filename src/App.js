import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SearchPage from "./Pages/SearchPage";
import * as BooksAPI from "./BooksAPI";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState([]);
  const [resltErr, setResultErr] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then((res) => {
      setAllBooks(res);
      setSuccess(true);
    });
  }, []);

  function changeSelf(book, targetshelf) {
    if (targetshelf === "none") {
      setAllBooks(allBooks.filter((b) => book.id !== b.id));
    } else {
      BooksAPI.update(book, targetshelf).then((data) => {
        console.log(data);
        BooksAPI.getAll().then((res) => {
          setAllBooks(res);
        });
      });
    }
  }

  function handleInput(e) {
    const Q = e.target.value;
    setResultErr("");
    if (Q !== null && Q !== "") {
      handleSearch(Q);
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
        setResultErr("No Result !");
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
              exacts
              element={
                <SearchPage
                  handleInput={handleInput}
                  result={result}
                  changeSelf={changeSelf}
                  allBooks={allBooks}
                  resltErr={resltErr}
                />
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      ) : null}
    </BrowserRouter>
  );
}

export default App;
