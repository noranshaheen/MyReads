import React from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";


function SearchPage({ handleInput, result, changeSelf, resltErr }) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {resltErr? resltErr : result.map((rslt) => {
          return <Book key={rslt.id} book={rslt} changeSelf={changeSelf}/>
        })}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
