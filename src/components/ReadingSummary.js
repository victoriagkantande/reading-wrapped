import React, { useEffect, useState } from 'react';
import { fetchBookGenres } from '../services/googleBooks';  // Import the new service file

const ReadingSummary = ({ books }) => {
  const [booksWithGenres, setBooksWithGenres] = useState([]);
  const [romanceBooksCount, setRomanceBooksCount] = useState(0);
  const [debugGenres, setDebugGenres] = useState([]);  // For debugging purposes

  useEffect(() => {
    const fetchGenres = async () => {
      // Fetch genres for each book
      const booksWithGenres = await Promise.all(
        books.map(async (book) => {
          const isbn = book['ISBN'];  // Ensure you have ISBN in your CSV
          const genres = isbn ? await fetchBookGenres(isbn) : [];
          return { ...book, genres };
        })
      );
      setBooksWithGenres(booksWithGenres);

      // Calculate the number of 5-star romance books
      const romanceBooks = booksWithGenres.filter(
        (book) => parseInt(book['My Rating']) === 5 && book.genres && book.genres.includes('Romance')
      );
      const count = romanceBooks.length;
      setRomanceBooksCount(count);

      // Set genres for debugging
      const debugData = romanceBooks.map((book) => ({
        title: book['Title'],
        author: book['Author'],
        genres: book.genres || ['No Genres Found'],
      }));
      setDebugGenres(debugData);
    };

    fetchGenres();
  }, [books]);

  const getTopRatedBooks = (books) => {
    return books
      .filter((book) => parseInt(book['My Rating']) === 5)
      .sort((a, b) => new Date(b['Date Read']) - new Date(a['Date Read']))
      .slice(0, 5);
  };

  const determineReaderArchetype = (books) => {
    const romanceBooksCount = books.filter(
      (book) => parseInt(book['My Rating']) === 5 && book.genres && book.genres.includes('Romance')
    ).length;

    if (romanceBooksCount >= 10) {
      return 'Hopeless Romantic';
    }

    return 'Avid Reader';  // Default archetype if fewer than 10 5-star romance books
  };

  const topBooks = getTopRatedBooks(booksWithGenres);
  const archetype = determineReaderArchetype(booksWithGenres);

  return (
    <div>
      <h2>Your Reading Summary</h2>
      <p>Archetype: {archetype}</p>
      <p>Number of 5-Star Romance Books: {romanceBooksCount}</p>  {/* Display the number of 5-star romance books */}

      <h3>Top 5 Recent 5-Star Books:</h3>
      <ul>
        {topBooks.map((book) => (
          <li key={book['Book Id']}>
            {book['Title']} by {book['Author']} - Genres: {book.genres ? book.genres.join(', ') : 'No Genres'}
          </li>
        ))}
      </ul>

      <h3>Debugging Information</h3>
      <h4>5-Star Romance Books:</h4>
      <ul>
        {debugGenres.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author} - Genres: {book.genres.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingSummary;
