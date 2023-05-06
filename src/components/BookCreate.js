import { useState, useContext } from 'react';
import { BookContext } from '../context/books';

// no longer need the onCreate prop
export default function BookCreate() {
  const [title, setTitle] = useState('');

  // we say that we want to use createBook function from BookContext
  const { createBook } = useContext(BookContext)

  const handleChange = ({target}) => {
    setTitle(target.value);
  };

  // we call the function that we passed as a prop (onCreate) when the form is submitted
  // and pass the title value we had setted using setTitle setter function to it to parent to use it
  // and to empty the value of the input we set the title to an empty string
  const handleSubmit = (e) => {
    e.preventDefault();
    // onCreate(title);
    createBook(title)
    setTitle('')
  };

  return (
    <div className='book-create'>
      <h3>Add a Book</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          className='input'
          type='text'
          id='title'
          onChange={handleChange}
          value={title}
        />
        <button className='button'>Create Book</button>
      </form>
    </div>
  );
}
