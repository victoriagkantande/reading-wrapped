import React, { useState } from 'react';
import './App.css';
import CSVUpload from './components/CSVUpload';
import ReadingSummary from './components/ReadingSummary';

function App() {
  const [books, setBooks] = useState([]);

  const handleDataParsed = (data) => {
    setBooks(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reading Wrapped</h1>
      </header>
      <CSVUpload onDataParsed={handleDataParsed} />
      {books.length > 0 && <ReadingSummary books={books} />}
    </div>
  );
}

export default App;
