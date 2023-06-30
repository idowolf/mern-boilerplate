import React from "react";
import style from "./styles.css"

const Home = () => {
  const [books, setBooks] = React.useState(null)
  const [message, setMessage] = React.useState("Click one of the buttons above")

  const getBooks = async (includeHeader, includeQueryParam) => {
    let urlPath = "/api/get_books"
    let extraConfig = {}
    if (includeHeader) {
      extraConfig.headers = {
        'All-Caps': true
      }
    }
    if (includeQueryParam) {
      urlPath += '?filter_first=5'
    }
    let res = await fetch(urlPath, extraConfig)
    let data = await res.json()
    setBooks(data.data)
    console.log(data.data)
    setMessage("GET worked! List of books available below")
  }

  const getBook = async (index) => {
    let res = await fetch(`/api/get_book/${index}`)
    let data = await res.json()
    setBooks(data.data)
    console.log(data.data)
    setMessage(`GET worked! Book no. ${index + 1} available below`)
  }

  const postBook = async (index) => {
    let body = {
      index,
      newTitle: 'Test POST'
    }
    let res = await fetch(`/api/post_book/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    let data = await res.json()
    setBooks(data.data)
    console.log(data.data)
    setMessage(`POST worked! Books available below. Book ${index + 1}'s title was updated`)
  }

  const putBook = async (title, author) => {
    let body = { title, author }
    let res = await fetch(`/api/put_book/`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    let data = await res.json()
    setBooks(data.data)
    console.log(data.data)
    setMessage(`PUT worked! Books available below`)
  }


  const deleteBook = async (index) => {
    let body = { index }
    let res = await fetch(`/api/delete_book/`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    let data = await res.json()
    setBooks(data.data)
    console.log(data.data)
    setMessage(`DELETE worked! Books available below. Book ${index + 1} was deleted`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
      <h1></h1>
      <button onClick={() => getBooks()}>GET Books</button>
      <button onClick={() => getBooks(true, false)}>GET Books (with 'All-Caps' header)</button>
      <button onClick={() => getBooks(false, true)}>GET Books (with 'filter_first=5' query param)</button>
      <button onClick={() => getBook(3)}>GET Book (with /index path param)</button>
      <button onClick={() => postBook(0)}>POST Book</button>
      <button onClick={() => putBook("Test title", "Test author")}>PUT Book</button>
      <button onClick={() => deleteBook(4)}>DELETE Book</button>
      <br />
      <div>{message}</div>
      <br />
      <div>Books list:</div>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Author</td>
          </tr>
        </thead>
        {books && books.map(book => (
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default Home;
