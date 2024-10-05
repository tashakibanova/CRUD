import React from 'react';
import NoteForm from './components/NoteForm';
import './styles/notes.css';

const App = () => {
  return (
    <div>
      <h1>Заметки</h1>
      <NoteForm />
    </div>
  );
};

export default App;
