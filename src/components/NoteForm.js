import React, { useState, useEffect } from 'react';

const NoteForm = () => {
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [updateMessage, setUpdateMessage] = useState(''); // Новое состояние для сообщения об обновлении

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:7070/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Ошибка при получении заметок:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    if (!content) return;

    try {
      const response = await fetch('http://localhost:7070/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 0, content }),
      });

      if (response.ok) {
        fetchNotes();
        setContent('');
      }
    } catch (error) {
      console.error('Ошибка при добавлении заметки:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:7070/notes/${id}`, {
        method: 'DELETE',
      });
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  const refreshNotes = async () => {
    await fetchNotes(); // Ждем выполнения fetchNotes
    setUpdateMessage('Список заметок обновлен!'); // Устанавливаем сообщение
    setTimeout(() => {
      setUpdateMessage(''); // Очищаем сообщение через 3 секунды
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={addNote} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введите заметку"
          style={{ marginRight: '10px', flex: 1 }} // Увеличиваем ширину поля ввода
        />
        <button type="submit">Добавить</button>
        <button onClick={refreshNotes} className="refresh-button" style={{ marginLeft: '10px' }}>
          Обновить
        </button>
      </form>
      {updateMessage && <div style={{ marginBottom: '20px', color: 'green' }}>{updateMessage}</div>} {/* Сообщение об обновлении */}
      <div className="note-container">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <p>{note.content}</p>
            <button className="delete-button" onClick={() => deleteNote(note.id)}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteForm;
