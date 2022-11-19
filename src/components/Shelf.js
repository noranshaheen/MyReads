import React from "react";
import Book from "./Book";

function Shelf({ title, section, allBooks,changeSelf }) {
  let sectionBooks = allBooks.filter((book) => { 
    return book.shelf === section && book;
  });
  // console.log(sectionBooks);
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
          {sectionBooks && sectionBooks.map((b) => {
            return (<Book key={b.id} book={b} changeSelf={changeSelf}/>)
        })}
      </ol>
    </div>
    </div>
  );
}

export default Shelf;

// 