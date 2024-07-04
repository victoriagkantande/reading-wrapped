import axios from 'axios';


const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyDmZgGBoN2ZNXb9y8oKY0UN-LFbczdParM';  

// Function to fetch book genres using ISBN
export const fetchBookGenres = async (isbn) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: `isbn:${isbn}`,
        key: API_KEY,
      },
    });

    const book = response.data.items ? response.data.items[0] : null;
    const genres = book && book.volumeInfo && book.volumeInfo.categories ? book.volumeInfo.categories : [];
    return genres;
  } catch (error) {
    console.error('Error fetching book genres:', error);
    return [];
  }
};
