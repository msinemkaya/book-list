import { createContext, useCallback, useState } from "react";
import axios from 'axios';

// we have created a context with the name of BookContext
// to use context you first should create it as a seperate file and export it
// for all the components to be able to use it (access to it)
export const BookContext = createContext()

// we create another function called Provider and return the provider
// with the child (in this case the children is App) values here because we want our value 
// to be not hardcoded but rather changable. So we create a setter and pass the value to the value
export function Provider({ children }) {
  const [books, setBooks] = useState([]);

  // to prevent infinite loop we wrapped our function with useCallback
  const fetchBooks = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  }, [])

  // WE NO LONGER DO THAT 
  // this goes all the way down to the BookShow and deletes the book with the id that has been clicked
  // by filtering the books and creating a new array without that book with what is returned from filter
  const deleteBookById = async (id) => {

    await axios.delete(`http://localhost:3001/books/${id}`)

    const updatedBooks = books.filter((book) => book.id !== id);

    setBooks(updatedBooks);
  };

  // WE NO LONGER DO THAT 
  // we pass this all the way down to the BookEdit component 
  
  // we are mapping the books for the id that is returning from there and change the title
  // according to what the passed newTitle is and set the new updated books
  const editBookById = async (id, newTitle) => {
    // const editedBook = books.find((book) => {
    //   if(book.id === id) {
    //     return {...book, title: newTitle}
    //   }
    //   return book
    // })

    // const index = books.findIndex((book) => book.id === id);
    // if (index !== -1) {
    //   books[index]['title'] = newTitle;
    //   setBooks(books);
    // }

    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books[index] = response.data;
      console.log(books);
    }

    setBooks([...books]);
  };

  // WE NO LONGER PASS THIS TO NOWHERE
  // child to parent communication so we pass this function as a whole to the child that would use it
  // in this case it is BookCreate component
  const createBook = async (title) => {
    //sending a promise for a post request to create a book and waiting for the responce
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    //adding the returned responce data to list of books
    setBooks([...books, response.data]);
  };

  // these are the things that we want to share throughout the application
  // we pass them down as a value to BookContext.Provider
  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks
  }

  return (
    <BookContext.Provider value={valueToShare}>
      {children}
    </BookContext.Provider>
  )
}
