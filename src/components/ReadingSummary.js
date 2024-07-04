import React, { useEffect, useState } from 'react';
import { fetchBookGenres } from '../services/googleBooks';

const ReadingSummary = ({ books }) => {
  const [booksWithGenres, setBooksWithGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const booksWithGenres = await Promise.all(
        books.map(async (book) => {
          const genres = await fetchBookGenres(book.Title, book.Author);
          return { ...book, genres };
        })
      );
      setBooksWithGenres(booksWithGenres);
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
    // Count the number of 5-star romance books
    const romanceBooksCount = books.filter(
      (book) => parseInt(book['My Rating']) === 5 && book.genres && book.genres.includes('Romance')
    ).length;

    if (romanceBooksCount >= 10) {
      return 'Hopeless Romantic';
    }

    return 'Avid Reader'; // Default archetype if fewer than 10 5-star romance books
  };

  const topBooks = getTopRatedBooks(booksWithGenres);
  const archetype = determineReaderArchetype(booksWithGenres);

  return (
    <div>
      <h2>Your Reading Summary</h2>
      <p>Archetype: {archetype}</p>
      <h3>Top 5 Recent 5-Star Books:</h3>
      <ul>
        {topBooks.map((book) => (
          <li key={book['Book Id']}>
            {book['Title']} by {book['Author']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingSummary;
