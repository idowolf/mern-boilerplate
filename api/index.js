const express = require('express');
const path = require('path');
const formidable = require('express-formidable');
const books = require('./books.json');
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');

const app = express();
var jsonParser = bodyParser.json()

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get("/api/get_books", async (req, res) => {
  let booksRes = JSON.parse(JSON.stringify(books))
  if (req.get("All-Caps")) {
    booksRes = booksRes.map(book => {
      return { author: book.author.toUpperCase(), title: book.title.toUpperCase() }
    })
  }
  if (req.query.filter_first) {
    booksRes = booksRes.slice(0, parseInt(req.query.filter_first))
  }
  res.send({ data: booksRes, success: true })
})

app.get("/api/get_book/:index", async (req, res) => {
  let booksRes = JSON.parse(JSON.stringify(books))
  let index = parseInt(req.params.index)
  res.send({ data: booksRes.slice(index, index + 1), success: true })
})

app.post("/api/post_book/", jsonParser, async (req, res) => {
  let booksRes = JSON.parse(JSON.stringify(books))
  let index = parseInt(req.body.index)
  let newTitle = req.body.newTitle
  booksRes[index].title = newTitle
  res.send({ data: booksRes, success: true })
})

app.put("/api/put_book/", jsonParser, async (req, res) => {
  let booksRes = JSON.parse(JSON.stringify(books))
  let title = req.body.title
  let author = req.body.author
  booksRes.push({ title, author })
  res.send({ data: booksRes, success: true })
})


app.delete("/api/delete_book/", jsonParser, async (req, res) => {
  let booksRes = JSON.parse(JSON.stringify(books))
  let index = parseInt(req.body.index)
  booksRes.splice(index, 1)
  res.send({ data: booksRes, success: true })
})

app.listen(PORT, function () {
  console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
});

module.exports = app;