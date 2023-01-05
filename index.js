const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/dbConfig');
const mongoose = require('mongoose');

db.once('open', () => {
    console.log('Conexão realizada');
});

const livrosSchema = new mongoose.Schema({
    id: {type: String},
    title: {type: String, required: true},
    autor: {type: String, required: true},
    favorito: {type: Boolean, required: true},
});

const livros = mongoose.model('testes', livrosSchema);

app.get('/teste', (req, res) => {
    livros.find((error, livros) => {
        res.status(200).json(livros);
    });
});





let books = [
    {_id: 1, title: 'O Senhor dos Anéis', autor: 'J. R. R. Tolkien', favorito: false},
    {_id: 2, title: 'Os Miseráveis', autor: 'Victor Hugo', favorito: true},
    {_id: 3, title: 'Os Irmãos Karamazov', autor: 'Fiódor Dostoiévski', favorito: true}
];

app.use(
    cors(),
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        nome: 'Plínio'
    })
});

app.get('/html', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
});

app.get('/books', (req, res) => {
    // const booksView = books.map(book => {
    //     if (book.favorito) {
    //         book.favorito = "Sim";
    //         return book;
    //     } else {
    //         book.favorito = "Não";
    //         return book;
    //     }
    // })
    res.send(books);
});

app.get('/books/:id', (req, res) => {
    const id = +(req.params.id);
    const book = books.find(book => book._id === id);
    if (book) {
        res.send(book);
    } else {
        res.sendStatus(404);
    };
});

app.post('/books', (req, res) => {
    const body = req.body;

    if (Array.isArray(body)) {
        body.map(obj => books.push(obj));
    } else {
        books.push(req.body);
    }
    res.send(books);
})

app.delete('/books/:id', (req, res) => {
    const id = +(req.params.id);
    const index = books.findIndex(obj => obj._id === id);
    if (index === -1) {
        res.sendStatus(404);
    } else {
        books.splice(index, 1);
        res.status(200).send(books);
    };
});

app.patch('/books/:id', (req, res) => {
    const id = +(req.params.id);
    const body = req.body;
    const book = books.find(obj => obj._id === id);

    book.title = body.title;
    
    res.send(books);

});

// const hostname = '192.168.2.26';
// app.listen(3000, hostname);
app.listen(5000);