import React from 'react';

const NotesList = ({ notes, onDelete }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <span>{note.content}</span>
          <button onClick={() => onDelete(note.id)} className="delete-button">Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
