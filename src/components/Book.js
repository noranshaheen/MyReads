import React, { useEffect, useState } from "react";

function Book({ book, changeSelf }) {
  const [bookImg, setBookImg] = useState("");
  useEffect(() => {
    setBookImg(book?.imageLinks?.thumbnail);
  }, [book]);
  //book.imageLinks.thumbnail

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={
              bookImg
                ? {
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${bookImg})`,
                  }
                : {
                    width: 128,
                    height: 193,
                    backgroundColor: "gray",
                  }
            }
          ></div>

          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf ? book.shelf : "none"}
              onChange={(e) => changeSelf(book, e.target.value)}
            >
              <option value="no" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.publisher ? book.publisher : "not found"}
        </div>
      </div>
    </li>
  );
}

export default Book;
