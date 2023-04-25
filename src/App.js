import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  // this goes all the way down to the BookShow and deletes the book with the id that has been clicked
  // by filtering the books and creating a new array without that book with what is returned from filter
  const deleteBookById = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);

    setBooks(updatedBooks);
  };

  // we pass this all the way down to the BookEdit component
  // we are mapping the books for the id that is returning from there and change the title
  // according to what the passed newTitle is and set the new updated books
  const editBookById = (id, newTitle) => {
      // const editedBook = books.find((book) => {
      //   if(book.id === id) {
      //     return {...book, title: newTitle}
      //   }
      //   return book
      // })

      const index = books.findIndex(book => book.id === id)
      if(index !== -1) {
        books[index]['title'] = newTitle
        setBooks(books)
      }

      // setBooks(editedBook)
  }

  // child to parent communication so we pass this function as a whole to the child that would use it
  // in this case it is BookCreate component
  const createBook = (title) => {
    setBooks([
      ...books,
      {
        id: Math.round(Math.random() * 9999),
        //title: title
        title,
      },
    ]);
  };

  return (
    <div className='app'>
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById}/>
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
