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
  }, [fetchBooks]);
  // as soon as we put fetchBooks as a dependency in useEffect, it causes for useEffect to go into an infinite loop
  // why?
  // because when we rerender all the variables in the memory that has affected from this render is created once again and placed
  // in memory with a brand new reference. so when we put a function here and cause a rerender in the component (App)
  // useEffect is being called again since the component has changed and creates a new reference to fetchBook function
  // and that causes useEffect the think that fetcBooks has changed and rerenders again nonstop with same steps.
  // (since fetchBooks sets the book state, that is what makes the component rerender)

  // we fix that using useCallback
  // useCallback returns the original function in the first render and if there are no dependecies it continues to do so
  // so this way reference of the function remains the same
  // if there are dependencies that has changed since the last render then it returns the new version of the function 

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
