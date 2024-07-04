import axios from 'axios';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBookGenres = async (title, author) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: `intitle:${title}+inauthor:${author}`,
        maxResults: 1,
      },
    });
    const book = response.data.items[0];
    return book.volumeInfo.categories || [];
  } catch (error) {
    console.error('Error fetching book genres:', error);
    return [];
  }
};
