import React from 'react';

const ReadingSummary = ({ books }) => {
  const getTopRatedBooks = (books) => {
    return books
      .filter(book => parseInt(book['My Rating']) === 5)
      .sort((a, b) => new Date(b['Date Read']) - new Date(a['Date Read']))
      .slice(0, 5);
  };

  const determineReaderArchetype = (books) => {
    const bookCount = books.length;

    if (bookCount < 10) {
      return '...Does this even count as reading?';
    } else if (bookCount < 50) {
      return 'Newbie Reader';
    } else if (bookCount < 100) {
      return 'This is starting to become a problem, hun x';
    } else if (bookCount < 200) {
      return 'Eat, Read, Repeat!';
    } else {
      return 'Seek help, immediately..';
    }
  };

  const topBooks = getTopRatedBooks(books);
  const archetype = determineReaderArchetype(books);

  return (
    <div>
      <h2>Your Reading Summary</h2>
      <p>Archetype: {archetype}</p>
      <h3>Top 5 Recent 5-Star Books:</h3>
      <ul>
        {topBooks.map((book, index) => (
          <li key={index}>
            {book['Title']} by {book['Author']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingSummary;
