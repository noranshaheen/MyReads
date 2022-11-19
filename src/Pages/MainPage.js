import React from "react";
import Header from "../components/Header";
import SearchBtn from "../components/SearchBtn";
import Shelf from "../components/Shelf";
// import { useState } from "react";

function MainPage({ allBooks,changeSelf }) {
  // console.log(allBooks);
  return (
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <div>
          <Shelf title={"Currently Reading"} section={"currentlyReading"} allBooks={allBooks} changeSelf={changeSelf} />
          <Shelf title={"Want To Read"} section={"wantToRead"} allBooks={allBooks} changeSelf={changeSelf} />
          <Shelf title={"Read"} section={"read"} allBooks={allBooks} changeSelf={ changeSelf} />
        </div>
      </div>
      <SearchBtn />
    </div>
  );
}

export default MainPage;
