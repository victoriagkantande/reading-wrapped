const determineReaderArchetype = (topBooks) => {
    const genreCount = {};
    topBooks.forEach((book) => {
      console.log('Genres for book', book.Title, ':', book.genres);
      if (book.genres) {
        book.genres.forEach((genre) => {
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
      }
    });
  
    console.log('Genre count:', genreCount);
  
    const sortedGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);
    console.log('Sorted genres:', sortedGenres);
  
    if (sortedGenres.length > 4) {
      return 'It\'s Giving Range!';
    }
  
    const topGenre = sortedGenres[0];
    if (!topGenre) {
      return 'Avid Reader'; // Default archetype if no genre is found
    }
  
    switch (topGenre.toLowerCase()) {
      case 'romance':
        return 'Hopeless Romantic';
      case 'fantasy':
        return 'Fantasy Fanatic';
      case 'mystery':
        return 'Mystery Maven';
      case 'non-fiction':
        return 'Non-fiction Nerd';
      default:
        return 'Avid Reader';
    }
  };

  export default ReadingSummary;