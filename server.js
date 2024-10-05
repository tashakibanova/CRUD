const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 7070;

// Используем CORS
app.use(cors());

// Используем body-parser для обработки JSON
app.use(bodyParser.json());

// Массив для хранения заметок
let notes = [];

// Получение всех заметок
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Добавление новой заметки
app.post('/notes', (req, res) => {
  const { id, content } = req.body;
  const newNote = { id: Date.now(), content }; // Используем Date.now() для уникального ID
  notes.push(newNote);
  res.status(201).json(newNote); // Возвращаем новую заметку с кодом 201
});

// Удаление заметки
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  notes = notes.filter(note => note.id != id); // Удаляем заметку по ID
  res.sendStatus(204); // Возвращаем статус 204 (No Content)
});

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
  res.send('Сервер запущен и работает!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
