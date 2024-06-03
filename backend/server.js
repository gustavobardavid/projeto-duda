const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors()); 
app.use(express.json());

// Arrays para armazenar os dados
const books = [];
const users = [];
const loans = [];

// Rotas para livros
app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).json(book);
});

// Rotas para usuários
app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

// Rotas para empréstimos
app.get('/loans', (req, res) => {
  res.json(loans);
});

app.post('/loans', (req, res) => {
  const loan = req.body;
  const book = books.find(b => b.id === loan.bookId);
  const user = users.find(u => u.id === loan.userId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  loans.push(loan);
  res.status(201).json(loan);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
