import { useRef, useState, useContext } from 'react';
import { BookContext } from '../context/books';

export default function BookEdit({ book, onSubmit }) {
  // we taka the onSubmit which consists of editBookById
  // and showEdit state

  // we give the books title as a default starting state
  const [title, setTitle] = useState(book.title);

  const { editBookById } = useContext(BookContext)

  const input = useRef(null)

  //then when there is a change inside of the input button we set a new title with setTitle setter function
  const handleChange = ({target}) => {
    setTitle(target.value);
  };

  const availability = () => {
    return book.title === title
  }
  
  // when the form is submitted we call the onSubmit and pass it books id and the new title we have setted as a
  // parameter for editBookById to use
  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit();
    editBookById(book.id, title) // we do it here instead directly
    // onSubmit(book.id, title); no need to pass id and title anymore
    // onEdit(book.id, title); no need anymore
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='book-edit'>
        <label>Title</label>
        <input type='text' onChange={handleChange} ref={input} value={title} />
        <button disabled={availability()} className='button is-primary'>Save</button>
      </form>
    </>
  );
}
