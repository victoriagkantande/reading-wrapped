import React, { useState } from 'react';
import './App.css';
import ReadingSummary from './components/ReadingSummary';

function App() {
  const [books, setBooks] = useState([]);

  // Handle the data parsed from CSV
  const handleDataParsed = (data) => {
    setBooks(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Goodreads Wrapped</h1>
      </header>
      <ReadingSummary books={books} onDataParsed={handleDataParsed} />
    </div>
  );
}

export default App;
