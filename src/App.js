import { useEffect, useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  };

  // useEffect is taking 2 arguments, first one is a callback function
  // and the second one is an array. If the array is empty
  // it executes the callback function on the first render (initial render) only
  // the callback in useEffect will ALWAYS be called, no mater what, in the initial render
  // depending on what is inside the array, also will determine if the callback will be executed or not
  // if there is an empty array ([]) it only executes once and never again
  // if you dont pass any second arguments it will be executed on every rerender
  // and if you pass a state variable or something that changes (maybe a prop) it will also be called when that value changes
  useEffect(() => {
    fetchBooks();
  }, []);

  // this goes all the way down to the BookShow and deletes the book with the id that has been clicked
  // by filtering the books and creating a new array without that book with what is returned from filter
  const deleteBookById = async (id) => {

    await axios.delete(`http://localhost:3001/books/${id}`)

    const updatedBooks = books.filter((book) => book.id !== id);

    setBooks(updatedBooks);
  };

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

  return (
    <div className='app'>
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
