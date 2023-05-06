import { useEffect, useContext } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import { BookContext } from './context/books';

function App() {

  // we destructured the fetchBooks from BookContext
  const { fetchBooks } = useContext(BookContext)
  
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

  return (
    <div className='app'>
      <h1>Reading List</h1>
      {/* no longer need any props since we use context */}
      <BookList/>
      <BookCreate/>
    </div>
  );
}

export default App;
