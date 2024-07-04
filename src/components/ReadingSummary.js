import React, { useState } from 'react';
import { CSVReader } from 'react-csv-reader';

const ReadingSummary = ({ books, onDataParsed }) => {
  const [archetype, setArchetype] = useState('');
  const [totalBooks, setTotalBooks] = useState(0);

  // Function to determine the reader archetype
  const determineReaderArchetype = (bookCount) => {
    if (bookCount >= 50) {
      return 'Book Monster';
    } else if (bookCount >= 30) {
      return 'Book Obsessive';
    } else if (bookCount >= 15) {
      return 'Avid Reader';
    } else if (bookCount >= 5) {
      return 'Casual Reader';
    } else {
      return 'Newbie Reader';
    }
  };

  // Handle CSV file reading
  const handleCSVLoad = (data) => {
    // Extract the number of books from CSV data
    const bookCount = data.length;  // Each row represents one book
    setTotalBooks(bookCount);

    // Determine the reader archetype
    const readerArchetype = determineReaderArchetype(bookCount);
    setArchetype(readerArchetype);

    // Pass the parsed data to the parent component
    onDataParsed(data);
  };

  return (
    <div>
      <h2>Your Reading Summary</h2>
      <CSVReader
        onFileLoaded={(data) => handleCSVLoad(data)}
        onError={(error) => console.error('Error reading CSV:', error)}
        onSubmit={(data) => handleCSVLoad(data)}
        parserOptions={{ header: true }}
      />
      <p>Archetype: {archetype}</p>
      <p>Total Books Read: {totalBooks}</p>
    </div>
  );
};

export default ReadingSummary;
