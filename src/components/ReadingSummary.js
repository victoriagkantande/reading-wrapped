import React from 'react';

const ReadingSummary = ({ books }) => {
  const getTopRatedBooks = (books) => {
    return books
      .filter(book => parseInt(book['My Rating']) === 5)
      .sort((a, b) => new Date(b['Date Read']) - new Date(a['Date Read']))
      .slice(0, 5);
  };

  const determineReaderArchetype = (books) => {
    const genreCount = {};
    books.forEach(book => {
      const genre = book['Bookshelves'];
      if (genre) {
        genre.split(', ').forEach(g => {
          genreCount[g] = (genreCount[g] || 0) + 1;
        });
      }
    });
    const sortedGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);
    if (sortedGenres.length > 4) {
      return 'It\'s Giving Range!';
    }
    const topGenre = sortedGenres[0];
    switch (topGenre) {
      case 'romance':
        return 'Hopeless Romantic';
      case 'fantasy':
        return 'Fantasy Fanatic';
      case 'mystery':
        return 'Mystery Maven';
      case 'non-fiction':
        return 'Non-fiction Babe';
      default:
        return 'Avid Reader';
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
        {topBooks.map(book => (
          <li key={book['Book Id']}>{book['Title']} by {book['Author']}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingSummary;
